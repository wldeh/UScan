async function get_item_name(barcode) {
  const resp = await fetch(`https://www.brocade.io/api/items/${barcode}`).then(
    (r) => r.json()
  )
  return resp
}

async function search_dsld({ query, brand = null }) {
  let url = `https://api.ods.od.nih.gov/dsld/v9/search-filter?q=${query}&sort_by=_score&sort_order=desc&status=2&date_start=2011&date_end=2023`
  if (brand) url = url + `&brand=${brand}`
  const resp = await fetch(url).then((r) => r.json())
  return resp
}

async function get_dsld_item({ label }) {
  const url = `https://api.ods.od.nih.gov/dsld/v9/label/${label}`
  const resp = await fetch(url).then((r) => r.json())
  return resp
}

export async function get_item_details({ barcode }) {
  console.log('here')
  console.log(barcode)
  const item_info = await get_item_name(barcode)
  let response
  if (item_info.status != 500) {
    response = await search_dsld({
      query: `${item_info.name} ${barcode.replace(
        /(\d)(\d{5})(\d{5})(\d)/,
        '$1 $2 $3 $4'
      )}`,
      brand: `${item_info.brand_name}`
    })
  } else {
    console.log("brocade couldn't find item")
    response = await search_dsld({
      query: `${barcode.replace(/(\d)(\d{5})(\d{5})(\d)/, '$1 $2 $3 $4')}`
    })
  }

  if (response && response.hits) {
    const array = response.hits.slice(0, 9)

    let item = null
    for (const hit of array) {
      const resp = await get_dsld_item({ label: hit._id })
      if (resp.upcSku.replace(/ /g, '') == barcode && resp.offMarket == 0) {
        item = resp
        break
      }
    }

    if (item) {
      console.log('Item found:')
      return item
    } else {
      console.log('No matching item found.')
    }
    return item
  } else {
    console.log('No hits found in the search response.')
    return null
  }
}
