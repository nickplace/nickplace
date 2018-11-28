export default function TimeElapsedString(ISODateStart, ISODateEnd) {
	let timeElapsed = 0

	if (typeof(ISODateStart) == 'number') {
		timeElapsed = ISODateStart
	} else {
	  let dateStart = (typeof(ISODateStart) == 'string') ? Date.parse(ISODateStart) : ISODateStart.getTime()
	  let dateEnd = (typeof(ISODateEnd) == 'string') ? Date.parse(ISODateEnd) : ISODateEnd.getTime()
	  timeElapsed = dateEnd - dateStart
	}

  let min = ("00" + Math.floor(timeElapsed/1000/60)).slice(-2)
  let sec = ("00" + Math.floor(timeElapsed/1000) % 60).slice(-2)
  let ms = ("00" + timeElapsed % 1000).slice(-2)

  return min+':'+sec+'.'+ms
}