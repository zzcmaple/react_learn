import classNames from "classnames";
import logo from "../../images/logo.png";
import {useRef, useState} from "react";
import orderBy from "lodash/orderBy";
import moment from "moment/moment";
import './index.scss';
const defaultList = [
  {
    rpid: 1,
    user: {
      uid: "gga",
      avatar: logo,
      uname: "周杰伦",
    },
    content: "哎呦，不错哦~",
    ctime: "10-13 11:29",
    like: 66,
    action: 0,
  },
  {
    rpid: 2,
    user: {
      uid: "saf",
      avatar: logo,
      uname: "周杰伦",
    },
    content: "哎呦，不错哦~",
    ctime: "09-15 11:29",
    like: 20,
    action: 0,
  },
  {
    rpid: 3,
    user: {
      uid: "aav",
      avatar: logo,
      uname: "周杰伦",
    },
    content: "哎呦，不错哦~",
    ctime: "08-16 11:29",
    like: 40,
    action: 0,
  },
];
const user = {
  uid: "123",
  avatar: logo,
  uname: "朱志程",
};
const tabList = [
  { type: 1, text: "最热" },
  { type: 2, text: "最新" },
];

export const Chat = () => {

  const [list, setList] = useState([...orderBy(defaultList, "like", "desc")]);
  const [sort, setSort] = useState(1); // 1: 最热 2: 最新 // 按id排序
  const delectComment = (id) => {
    const newList = list.filter((item) => item.rpid !== id);
    setList(newList);
  };
  const commentAction = (id, action) => {
    const newList = list.map((item) => {
      if (item.rpid === id) {
        return {
          ...item,
          action: item.action === action ? 0 : action,
          // 点击：如果已经是喜欢状态，取消喜欢，如果是不喜欢状态，判断点击的是不是喜欢，如果是喜欢，喜欢数+1，如果是不喜欢，则没有变化
          like:
              item.action === 1
                  ? item.like - 1
                  : action === 1
                      ? item.like + 1
                      : item.like,
        };
      }
      return item;
    });
    setList(newList);
  };
  const sortBySortType = (action = sort, newList = list) => {
    if (action === 1) {
      // 最热
      setList(orderBy(newList, "like", "desc"));
    } else if (action === 2) {
      setList(orderBy(newList, "ctime", "desc"));
    }
  };
  const inputRef = useRef(null);
  const sortList = (action) => {
    setSort(action);
    sortBySortType(action, list);
  };
  const [commentValue, setCommentValue] = useState("");
  const uploadComment = () => {
    if (!commentValue) {
      inputRef.current.focus();
      return;
    }
    const item = {
      rpid: Date.now(),
      user,
      content: commentValue,
      ctime: moment(new Date()).format("MM-DD HH:mm"),
      like: 0,
      action: 0,
    };
    const newList = [item, ...list];  // 评论列表
    sortBySortType(sort, newList);
    setCommentValue("");
  };
  return <>
    <div className="reply-navigation">
      <ul className="nav-bar">
        <li className="nav-title">
          <span className="nav-title-text">评论</span>
          {/* 评论数量 */}
          <span className="total-reply">{list.length}</span>
        </li>
        <li className="nav-sort">
          {tabList.map((item) => {
            return (
                <div
                    key={item.type}
                    className={classNames(
                        "nav-item",
                        sort === item.type && "active",
                    )}
                    onClick={() => sortList(item.type)}
                >
                  {item.text}
                </div>
            );
          })}
        </li>
      </ul>
    </div>

    <div className="reply-wrap">
      {/* 发表评论 */}
      <div className="box-normal">
        {/* 当前用户头像 */}
        <div className="reply-box-avatar">
          <div className="bili-avatar">
            <img className="bili-avatar-img" src={logo} alt="用户头像" />
          </div>
        </div>
        <div className="reply-box-wrap">
          {/* 评论框 */}
          <textarea
              ref={inputRef}
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
          />
          {/* 发布按钮 */}
          <div className="reply-box-send" onClick={uploadComment}>
            <div className="send-text">
              发布
            </div>
          </div>
        </div>
      </div>
      {list.map((item) => {
        return (
            <div className="reply-list" key={item.rpid}>
              {/* 评论项 */}
              <div className="reply-item">
                {/* 头像 */}
                <div className="root-reply-avatar">
                  <div className="bili-avatar">
                    <img
                        className="bili-avatar-img"
                        src={item.user.avatar}
                        alt=""
                    />
                  </div>
                </div>

                <div className="content-wrap">
                  {/* 用户名 */}
                  <div className="user-info">
                    <div className="user-name">{item.user.uname}</div>
                  </div>
                  {/* 评论内容 */}
                  <div className="root-reply">
                    <span className="reply-content">{item.content}</span>
                    <div className="reply-info">
                      {/* 评论时间 */}
                      <span className="reply-time">{item.ctime}</span>
                      {/* 喜欢 */}
                      <span className="reply-like">
                        {/* 选中类名： liked */}
                        <i
                            className={
                              item.action === 1
                                  ? "icon like-icon liked"
                                  : "icon like-icon"
                            }
                            onClick={() => commentAction(item.rpid, 1)}
                        />
                        <span>{item.like}</span>
                      </span>
                      {/* 不喜欢 */}
                      <span className="reply-dislike">
                        {/* 选中类名： disliked */}
                        <i
                            className={
                              item.action === 2
                                  ? "icon dislike-icon disliked"
                                  : "icon dislike-icon"
                            }
                            onClick={() => commentAction(item.rpid, 2)}
                        />
                      </span>
                      {item.user.uid === user.uid && (
                          <span
                              className="delete-btn"
                              onClick={() => delectComment(item.rpid)}
                          >
                          删除
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
      })}
      {/* 评论列表 */}
      {!list.length && <div className="reply-none">暂无评论</div>}
    </div>
  </>
}