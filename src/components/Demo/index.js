import {useEffect, useState} from "react";

const getPageData = (page, pageSize) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({msg: 'success', data: {page, pageSize}})
    }, 3000)
  });
}
export const Demo = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getData = async () => {
      const res = await getPageData(page, 10);
      setData(res.data);
    }
    getData();
  }, [page]);
  return <div>我是一个demo例子 当前页 {data.page}  当前请求数量 { data.pageSize }
    <button onClick={() => setPage(page + 1)}>下一页</button>
  </div>
}