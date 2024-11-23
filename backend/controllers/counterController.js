import asyncHandler from 'express-async-handler'
import Counter from '../models/counterModel.js'

const id = '65fed9947585f070bd06e836'

// PUT api/visitors/pic/increase

const increaseVisitors = asyncHandler(async (req, res) => {
  console.log(req.url)
  let url = req.url
  const count = await Counter.findById(id)

  if (url === '/increase') {
    const visitorsInDb = count.visitorsCount

    count.visitorsCount = visitorsInDb + 1
  } else {
    console.log('unknown url')
  }

  const countVisitors = await count.save()

  res.json(countVisitors)
})

// GET api/visitors/pic/counter (both agreed and declined)

const getVisitors = asyncHandler(async (req, res) => {
  console.log(req.url)
  let url = req.url

  const count = await Counter.findById(id)

  if (url === '/count') {
    const visitorsCount = count.visitorsCount

    res.json(visitorsCount)
  } else {
    console.log('Unknown url')
  }
})

export { getVisitors, increaseVisitors }
