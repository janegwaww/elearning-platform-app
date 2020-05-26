import React from "react";

import { ProNavbar, Navbar } from "./components/ProfileNav";
import Pagination from "@material-ui/lab/Pagination";
import { Container, Avatar, TextField } from "@material-ui/core";
import { ChatBubbleOutlineOutlined } from "@material-ui/icons";
const MsgCenter = (props) => {
  console.log(props);
  const that = props.parent;

  return (
    <section className="all-height viev-scroll">
      <div>消息中心</div>
      <div className="box box-align-center box-between">
        <nav>
          <ProNavbar
            list={["回复我的", "我的私信", "收到的赞", "系统通知"]}
            parent={props}
          />
        </nav>
        <div className="pronavbar-btn fn-color-9E9EA6 bg-F2F2F5 fn-size-12 text-center">
          全部已读
        </div>
      </div>

      <main>
        <div className="box box-align-start">
          <span className="fn-color-F86B6B">*</span>
          <div style={{ marginLeft: 10 }}>
            <p className="zero-edges">2020拜年祭—除夕贺岁节目正在直播 !</p>
            <p className="zero-edges">
              社会主义核心价值观是社会主义核心价值体系的内核，体现社会主义核心价值体系的根本性质和基本特征，反映社会主义核心价值体系的丰富内涵和实践要求，是社会主义核心价值体系的高度凝练和集中表达。看直播>>
              网页链接
            </p>
            <p className="zero-edges">2020年09月14日 12:51</p>
          </div>
        </div>
        <div className="box box-align-start">
          <span className="fn-color-F86B6B">*</span>
          <div style={{ marginLeft: 10 }}>
            <p className="zero-edges">2020拜年祭—除夕贺岁节目正在直播 !</p>
            <p className="zero-edges">
              社会主义核心价值观是社会主义核心价值体系的内核，体现社会主义核心价值体系的根本性质和基本特征，反映社会主义核心价值体系的丰富内涵和实践要求，是社会主义核心价值体系的高度凝练和集中表达。看直播>>
              网页链接
            </p>
            <p className="zero-edges">2020年09月14日 12:51</p>
          </div>
        </div>
        <div className="box box-align-start">
          <span className="fn-color-F86B6B">*</span>
          <div style={{ marginLeft: 10 }}>
            <p className="zero-edges">2020拜年祭—除夕贺岁节目正在直播 !</p>
            <p className="zero-edges">
              社会主义核心价值观是社会主义核心价值体系的内核，体现社会主义核心价值体系的根本性质和基本特征，反映社会主义核心价值体系的丰富内涵和实践要求，是社会主义核心价值体系的高度凝练和集中表达。看直播>>
              网页链接
            </p>
            <p className="zero-edges">2020年09月14日 12:51</p>
          </div>
        </div>
        赞，私信/回复
        <div className="box box-between box-align-center">
          <div className="box  box-align-start">
            <span className="fn-color-F86B6B">*</span>
            <div className="box box-align-start">
              <Avatar />
              <div>
                <p className="zero-edges">Omnicreativora</p>
                <p className="zero-edges">赞了我的视频</p>
                <p>2020年09月14日 12:51</p>
              </div>
            </div>
          </div>
          <Avatar />
        </div>
        <div className="box box-between box-align-center">
          <div className="box  box-align-start">
            <span className="fn-color-F86B6B">*</span>
            <div className="box box-align-start">
              <Avatar />
              <div>
                <p className="zero-edges">Omnicreativora</p>
                <p className="zero-edges">对我的视频发表了评论</p>
                <p className="zero-edges">
                  Glad Conan is showing support for the Swedish-German
                  community，Jordan is currently watching them through Conan’s
                  ceiling，Conan: makes hd quality home made talk show Me: ah
                  yes unsubscribe to jimmy fallon
                </p>
                <p>
                  2020年09月14日 12:51{" "}
                  <span>
                    <ChatBubbleOutlineOutlined />
                    回复
                  </span>
                </p>
                <div>
                  回复@Omnicreativora：
                  <TextField />
                </div>
              </div>
            </div>
          </div>
          <Avatar />
        </div>
      </main>

      <footer className="box box-end profile-top">
        <Pagination shape="rounded" count={20} />
      </footer>
    </section>
  );
};
export default MsgCenter;
