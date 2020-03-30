    /*  约定：
        page：页码
        model：模型
        projection：投影
        query:查询条件
        sort：排序,
        populates:关联的数组

    */
async function pagination(options){
    let {page,model,projection,query,sort,populates} = options;
    page = parseInt(page);
    if(isNaN(page)){
        page = 1;
    }
    let limit = 2;
    let skip = (page - 1) * limit;

    const count = await model.find(query) // 查询所有值
    let pages = Math.ceil(count.length / limit); //页码总页数
    let length = count.length;
    let list = [];
    for(var i = 1;i<=pages;i++){
        list.push(i);
    }

    let result =model.find(query,projection);
    if(populates){
        populates.forEach(populate=>{
            result = result.populate(populate);
        })
    }
    const users = await result.sort(sort).skip(skip).limit(limit)

    // const users = await model.find(query,projection).sort(sort).skip(skip).limit(limit)

    return {
        page,
        pages,
        users,
        list,
    }


}

module.exports = pagination;