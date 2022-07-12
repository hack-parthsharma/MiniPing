// get all "pages" tag
const pages = document.querySelectorAll("section div.page")

// for each one, loop over
pages.forEach(page => {
  // get the url from the paragraph
  const url = page.querySelector("p.url").innerHTML.trim()

  // get the output tag
  const resultTag = page.querySelector("output")

  // show loading states
  page.classList.add("loading")
  resultTag.innerHTML = "Loading"

  // work out a scale from 0ms to 3000ms
  // where green is 0ms
  // and red is 3000ms (or longer)
  const speedScale = d3.scaleLinear()
    .domain([0, 3000])
    .range(["#4fed8d", "#fb5331"])
    .clamp(true)
    .interpolate(d3.interpolateHsl)

  // use Ajax and our Python API to get the url
  fetch("/ping?url=" + url)
    .then(response => response.json())
    .then(data => {
      // from the data for each one, show how long
      resultTag.innerHTML = data.speed + "ms"

      // if its a valid url, good to go
      if (data.code === 200 || data.code == 301) {
        page.style.setProperty("--highlight", speedScale(data.speed))
      } else {
        page.classList.add("error")
      }
    })
    .catch(err => {
      // if errors, show them
      resultTag.innerHTML = "Error"
      page.classList.add("error")
    })
    .finally(() => {
      // if success or error, remove loading
      page.classList.remove("loading")
    })
})