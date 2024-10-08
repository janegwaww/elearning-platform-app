import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import KeContainer from "../Container/KeContainer";
import LightTooltip from "../Introduction/LightTooltip";
import { useLoginConfirm } from "../LoginConfirm";
import { isLoggedIn } from "../../services/auth";
import { aliPayment, verifyAliPay, aliWapPayment } from "../../services/video";
import { getIdFromHref } from "../../services/utils";

const ShopBar = ({ info = {}, did }) => {
  const loginConfirm = useLoginConfirm();
  const matchMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [paidedHref, setPaidedHref] = useState("");
  const { out_trade_no } = getIdFromHref();

  const verifyIsPaided = (id) => {
    verifyAliPay({ order_id: id }).then((data) => {
      const { file_path } = data;
      if (file_path) {
        setPaidedHref(file_path);
        setIsPay(!!file_path);
      } else {
        setTimeout(() => {
          verifyIsPaided(id);
        }, 5000);
      }
    });
  };

  const paymentClick = (e) => {
    e.preventDefault();
    const { price } = info;
    !matchMobile
      ? aliPayment({ price, file_id: did, url: window.location.href }).then(
          (data) => {
            if (data.url && data.order_id) {
              window.open(data.url);
              verifyIsPaided(data.order_id);
            }
            !isLoggedIn() && loginConfirm();
          },
        )
      : aliWapPayment({ price, file_id: did, url: window.location.href }).then(
          (data) => {
            if (data.url && data.order_id) {
              window.location.href = data.url;
            }
            !isLoggedIn() && loginConfirm();
          },
        );
  };

  const handleCheck = () => {
    if (info.lang === "cn") {
      return navigate(`/documentsearch/?dsid=${did}`);
    }
    window.open(paidedHref);
  };

  useEffect(() => {
    setIsPay(!!info.file_path);
    setPaidedHref(info.file_path);
  }, [info.is_pay]);

  //此页面的rem 是2020/8/3更改，即为1920宽屏上的实际尺寸/16,1rem为：16/1920*当前屏宽
  useEffect(() => {
    if (out_trade_no) {
      verifyAliPay({ order_id: out_trade_no }).then((data = {}) => {
        const { file_path } = data;
        setPaidedHref(file_path);
        setIsPay(!!file_path);
      });
    }
  }, [out_trade_no]);

  return (
    <AppBar position="fixed" className="doc-shop-bar">
      <KeContainer>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="baseline"
          pt={2}
          pb={1}
          style={{ maxWdith: 1000 }}
        >
          <div className="doc-price-title" style={{ fontSize: "1.25rem" }}>
            限时解锁&nbsp;
          </div>
          <div className="doc-price" style={{ fontSize: "2rem" }}>
            <span>￥</span>
            {`${info.price || 0}`}
          </div>
          <Box width={"6.25rem"} />
          <div className="unlock-button">
            {isPay ? (
              <ButtonBase
                className="pay-button"
                onClick={handleCheck}
                style={{ padding: "0.625rem 3.125rem", fontSize: "1.125rem" }}
              >
                查看
              </ButtonBase>
            ) : (
              <ButtonBase
                onClick={paymentClick}
                size="small"
                className="pay-button"
                style={{ padding: "0.625rem 3.125rem", fontSize: "1.125rem" }}
              >
                立即解锁
              </ButtonBase>
            )}
            <Box
              display="flex"
              alignItems="center"
              mt={1}
              onMouseOver={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <Typography variant="caption" color="textSecondary">
                温馨提示：
              </Typography>
              <Typography variant="caption">解锁后不再收费</Typography>
              <LightTooltip
                title="该课题会因为内容更新或扩充而调整价格"
                arrow
                placement="top-end"
                open={open}
                disableHoverListener
                disableFocusListener
              >
                <div>
                  <HelpOutlineIcon
                    color="error"
                    style={{ fontSize: "0.75rem" }}
                  />
                </div>
              </LightTooltip>
            </Box>
          </div>
        </Box>
      </KeContainer>
    </AppBar>
  );
};

export default ShopBar;
