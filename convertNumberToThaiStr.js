function numberToThaiWords(number) {
    const units = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
    const positions = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];

    // Split the number into integer and decimal parts
    const [integerPart, decimalPart] = number.toString().split('.');

    // Function to convert a group of digits to Thai words
    function convertGroup(group) {
        let result = '';
        let hasUnit = false; // Track whether a unit (1-9) is present in the group

        for (let i = 0; i < group.length; i++) {
            const digit = parseInt(group[i], 10);

            if (digit !== 0) {
                hasUnit = true;

                if (digit === 1 && i === group.length - 1) {
                    result += 'เอ็ด'; // Special case for number 1
                } else if (digit === 2 && i === group.length - 2) {
                    result += 'ยี่'; // Special case for number 2 in tens position
                } else if (digit === 1 && i === group.length - 2) {
                    result += ''; // Blank for number 1 in tens position
                }
                else {
                    result += units[digit];
                }
            }

            if (digit !== 0 && i < group.length - 1) {
                result += positions[group.length - 1 - i];
            }
        }

        if (!hasUnit) {
            // If there are no units (1-9) in the group, add zero
            result += units[0];
        }

        return result;
    }

    // Convert integer part to Thai words
    let thaiWords = convertGroup(integerPart);

    // Add the word "บาท" for the integer part
    if (thaiWords !== '') {
        thaiWords += 'บาท';
    }

    // Convert decimal part to Thai words
    if (decimalPart) {
        thaiWords += convertGroup(decimalPart) + 'สตางค์';
    }

    return thaiWords;
}

