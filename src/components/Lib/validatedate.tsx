  export function validateDate(value: string) {
    const dateRegex = /^\d\d\.\d\d\.\d\d\d\d$/;
    
    if (!dateRegex.test(value)) {
      return 'Некорректная дата дд.мм.гггг';
    }
    
    const today = new Date().getTime();
    const yearCurrent = new Date().getFullYear();
    const year = Number(value.slice(6))
    const month = Number(value.slice(3,5))
    const day = Number(value.slice(0,2))

    if (day > 31 || day < 1) {
      return "Некорректный день";
    }

    if (month > 12 || month < 1) {
      return "Некорректный месяц";
    }

    let date = new Date().getTime();

    try {
      date = new Date(year, month-1, day).getTime();
    } catch (err) {
      console.log("Некорректная дата дд.мм.гггг", err);
      return "Некорректная дата дд.мм.гггг";
    }

    if (date > today) {
      return "Эта дата ещё не наступила";
    }

    if ((yearCurrent - year) > 1) {
      return "Эта дата слишком давняя";
    }
    return '';
  };
  