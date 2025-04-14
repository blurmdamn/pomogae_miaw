export const getCurrencySymbol = (storeName) => {
    if (!storeName) return '';
  
    switch (storeName.toLowerCase()) {
      case 'gog':
      case 'nintendo':
        return '$';
      case 'steam':
        return '₸';
      default:
        return '';
    }
  };
  