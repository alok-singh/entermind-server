const { PdfReader } = require("pdfreader");

const flushRows = (rows, page) => {
  return Object.keys(rows) // => array of y-positions (type: float)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
    .map((y) => {
      return { text: (rows[y] || []).map(item => item.text).join(""), y, page, fontSize: rows[y]?.[0]?.fontSize, color: rows[y]?.[0]?.color }
    }
    );
}

const getFileText = (file, fontSize, startPage, topStart, endPage, topFinish) => {
  return new Promise((resolve, reject) => {
    let page = 0;
    let rows = {}; // indexed by y-position
    const fileContent = [];
    new PdfReader().parseBuffer(file, (error, item) => {
      if (error) {
        reject(error);
      } else if (!item) {
        fileContent.push(flushRows(rows, page));
        resolve(fileContent);
      } else if (item.page) {
        // print the rows of the previous page
        fileContent.push(flushRows(rows, page));
        rows = {};
        page += 1;
      } else if (
        item.text &&
        (!fontSize || item?.R?.[0]?.TS?.[1] === fontSize) &&
        (!topStart || (item?.y > topStart && startPage <= page)) &&
        (!topFinish || (item?.y < topFinish && endPage >= page))
      ) {
        // checking the font-size for the line item
        // accumulate text items into rows object, per line
        rows[item.y] = rows[item.y] || [];
        rows[item.y].push({ text: item.text, fontSize: item?.R?.[0]?.TS?.[1], color: item.oc });
      }
    });
  });
}

const findNumberInLineIndex = (text, direction = "ltr") => {
  // Regex to match numbers (including decimals)
  const regex = /\d+(\.\d+)?/g;
  const matches = [...text.matchAll(regex)];

  if (matches.length === 0) return null;

  // Choose match based on direction
  const match = direction === "ltr" ? matches[0] : matches[matches.length - 1];

  return match.index;
}

const parseBlackLine = (line) => {
  const [rawStartString, amountString] = line.split('USD');
  const amount = parseFloat(amountString.trim());
  if (isNaN(amount)) {
    return;
  }
  return {
    title: rawStartString.trim(),
    amount: amount,
  }
}

const parseGrayLine = (line) => {
  const [rawStartString, amountString] = line.split('USD');
  const startString = rawStartString.replace(/,/g, '');
  const amount = parseFloat(amountString?.trim?.());
  if (isNaN(amount)) {
    return;
  }
  const numberIndex = findNumberInLineIndex(startString, 'rtl');
  return {
    rate: startString.substring(0, numberIndex),
    quantity: startString.substring(numberIndex).replace(/\(/g, '').replace(/\)/g, ''),
    amount: amount,
  }
}

const parseAwsBill = async (file) => {
  const raw = await getFileText(file);
  const parsedFile = raw.flatMap(item => [...item]).map(item => {
    return { ...item, text: item.text.replace(/ C /g, 'C').replace(/ G /g, 'G') }
  }).filter(item => !item.text.startsWith('DescriptionUsage'));
  const fileContent = parsedFile.slice(0, parsedFile.findIndex(item => item.text.startsWith('Charges by account')));
  const headings = fileContent.filter(item => item.fontSize === 16).map(item => {
    const [subcategory, amount] = item.text.split('USD');
    return { ...item, subcategory: subcategory.trim(), amount: parseFloat(amount.trim()) };
  });

  const results = headings.map((line, index) => {
    const line1 = line;
    const line2 = headings[index + 1];
    const subTotalList = fileContent.filter(item => {
      const line1page = parseFloat(line1.page);
      const line2page = parseFloat(line2?.page);
      const line1y = parseFloat(line1.y);
      const line2y = parseFloat(line2?.y);
      const itemPage = parseFloat(item.page);
      const itemY = parseFloat(item.y);
      if (!line2) {
        return (itemPage === line1page && itemY > line1y || itemPage > line1page)
      }
      if (line1page === line2page) {
        return itemY > line1y && itemY < line2y && itemPage === line2page;
      }
      return (itemPage === line1page && itemY > line1y) || (itemPage === line2page && itemY < line2y)
    });


    const details = subTotalList.reduce((acc, item) => {
      const costIndex = acc.length - 1;
      if (item.fontSize > 14) {
        const [title, trimmedCost] = item.text.split('USD');
        const region = title.replace(/\(/g, '').replace(/\)/g, '');
        const subCategoryTotalCost = trimmedCost.indexOf(')') === -1 ? parseFloat(trimmedCost.trim()) : (-1) * parseFloat((trimmedCost.replace('(', '')).trim());
        if (subCategoryTotalCost >= 0) {
          acc.push({ title: region, amount: subCategoryTotalCost, subtotal: [] });
        } else {
          acc.push({ title: region, amount: subCategoryTotalCost });
        }
        return acc;
      }

      if (item.fontSize > 12 && item.color === '#676f78' && acc[costIndex]?.subtotal) {
        const subtotalIndex = acc[costIndex].subtotal.length - 1;
        const parsedLine = parseGrayLine(item.text);
        if (parsedLine) {
          acc[costIndex].subtotal[subtotalIndex].rates = acc[costIndex].subtotal[subtotalIndex].rates || [];
          acc[costIndex].subtotal[subtotalIndex].rates.push(parsedLine);
        }
        return acc;
      }

      if (item.fontSize > 12 && acc[costIndex]?.subtotal) {
        acc[costIndex].subtotal.push(parseBlackLine(item.text));
      }
      return acc;
    }, []);

    return {
      subcategory: line.subcategory,
      subcategoryAmount: line.amount,
      details
    }
  });

  const billHeader = fileContent[1];
  const billingPeriod = billHeader.text.substring(0, 20);
  const account = billHeader.text.substring(20, 32);
  return {
    billingPeriod, account, results
  }
};

module.exports = { parseAwsBill };