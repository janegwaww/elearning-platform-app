import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import KeContainer from "../Container/KeContainer";
import LightTooltip from "../Introduction/LightTooltip";
import { useLoginConfirm } from "../LoginConfirm";
import { isLoggedIn } from "../../services/auth";
import { aliPayment, verifyAliPay } from "../../services/video";

const ShopBar = ({ info = {}, did }) => {
  const loginConfirm = useLoginConfirm();
  const [open, setOpen] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [paidedHref, setPaidedHref] = useState("");

  const verifyIsPaided = (id) => {
    verifyAliPay({ order_id: id }).then((data) => {
      const { file_path } = data;
      if (file_path) {
        setPaidedHref(file_path);
        setIsPay(!!file_path);
      } else {
        setTimeout(() => {
          verifyIsPaided(id);
        }, 1000);
      }
    });
  };

  const paymentClick = (e) => {
    e.preventDefault();
    const { price } = info;
    aliPayment({ price, file_id: did, url: window.location.href }).then(
      (data) => {
        if (data.url && data.order_id) {
          window.open(data.url);
          verifyIsPaided(data.order_id);
        }
        !isLoggedIn() && loginConfirm();
      }
    );
  };

  useEffect(() => {
    setIsPay(!!info.file_path);
    setPaidedHref(info.file_path);
  }, [info.is_pay]);
//此页面的rem 是2020/8/3更改，即为1920宽屏上的实际尺寸/16,1rem为：16/1920*当前屏宽
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
          <div className="doc-price-title" style={{fontSize:'1.25rem'}} >限时解锁&nbsp;</div>
          <div className="doc-price" style={{fontSize:'2rem'}}>
            <span >￥</span>
            {`${info.price || 0}`}
          </div>
          <Box width={'6.25rem'} />
          <div className="unlock-button">
            {isPay ? (
              <ButtonBase
                className="pay-button"
                onClick={() => window.open(paidedHref)}
                style={{padding:'0.625rem 3.125rem',fontSize:'1.125rem'}}
              >
                查看
              </ButtonBase>
            ) : (
              <ButtonBase
                onClick={paymentClick}
                size="small"
                className="pay-button"
                style={{padding:'0.625rem 3.125rem',fontSize:'1.125rem'}}
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
                  <HelpOutlineIcon color="error" style={{ fontSize: '0.75rem' }} />
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
