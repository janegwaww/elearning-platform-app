import React, { useEffect, useState } from "react";
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
  const { trade_no } = getIdFromHref();

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

  useEffect(() => {
    setIsPay(!!info.file_path);
    setPaidedHref(info.file_path);
  }, [info.is_pay]);

  useEffect(() => {
    if (trade_no) {
      verifyAliPay({ order_id: trade_no }).then((data = {}) => {
        const { file_path } = data;
        setPaidedHref(file_path);
        setIsPay(!!file_path);
      });
    }
  }, [trade_no]);

  return (
    <AppBar position="fixed" className="doc-shop-bar">
      <KeContainer>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="baseline"
          pt={2}
          pb={1}
        >
          <div className="doc-price-title">限时解锁&nbsp;</div>
          <div className="doc-price">
            <span style={{ fontSize: 23 }}>￥</span>
            {`${info.price || 0}`}
          </div>
          <Box width={100} />
          <div className="unlock-button">
            {isPay ? (
              <ButtonBase
                className="pay-button"
                onClick={() => window.open(paidedHref)}
              >
                查看
              </ButtonBase>
            ) : (
              <ButtonBase
                onClick={paymentClick}
                size="small"
                className="pay-button"
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
                  <HelpOutlineIcon color="error" style={{ fontSize: 12 }} />
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
