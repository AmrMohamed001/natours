class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    let queryCopy = { ...this.queryString };
    let exculdeFields = ['sort', 'page', 'limit', 'fields'];
    exculdeFields.forEach((ele) => delete queryCopy[ele]);
    let advQuery = JSON.stringify(queryCopy);
    advQuery = advQuery.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(advQuery));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(',').join(' ');
      this.query.sort(sortBy);
    } else this.query.sort('-createdAt');
    return this;
  }
  project() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(',').join(' ');
      this.query.select(fields);
    } else this.query.select('-__v');
    return this;
  }
  pagination() {
    let page = this.queryString.page * 1 || 1;
    let limit = this.queryString.limit * 1 || 100;
    let skip = (page - 1) * limit || 0;
    this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = ApiFeatures;
