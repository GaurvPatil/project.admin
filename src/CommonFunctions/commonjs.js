




export function convertDate(inputFormat) {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    function pad(s) {
      return s < 10 ? '0' + s : s
    }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), monthNames[d.getMonth()], d.getFullYear()].join(' ')
  }



