const Sort = (data) => {
    const sortedData = [...data]
    return sortedData.sort((a, b) => { return a.cases > b.cases ? -1 : 1 })
}

export default Sort;