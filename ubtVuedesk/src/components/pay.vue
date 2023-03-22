<template>
  <!-- 下单页 -->
  <div class="order">
    <div class="bottom-btn" @click="payOrder">立即购买</div>
  </div>
</template>
  
  <script>
export default {
  name: "Order",
  data() {
    return {};
  },
  methods: {
    payOrder() {
      console.log("hhhhhhh");
      this.$axios
        .post("/node/pay/placeAnOrder", {
            params: {
            description: "书山苑网店--购书",
            out_trade_no: "1217752501201407033233368018",
            notify_url: "https://serve.sirbook.top",
            amount: {
              total: 1,
            },
          },
        })
        .then((res) => {
          console.log(res, "pay");
        })
        .catch((err) => {
          console.log(err);
        });
      /* this.postRequestWWW("node/pay/generalQRCode", {
        sessionId: this.sessionId,
        userId: localStorage.getItem("userId"),
      })
        .then((res) => {
          if (res.data.code === 0) {
            const pay_params = res.data.data;
            if (typeof WeixinJSBridge === "undefined") {
              if (document.addEventListener) {
                document.addEventListener(
                  "WeixinJSBridgeReady",
                  this.onBridgeReady,
                  false
                );
              } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady);
                document.attachEvent(
                  "onWeixinJSBridgeReady",
                  this.onBridgeReady
                );
              }
            } else {
              this.onBridgeReady(pay_params);
            }
          } else {
            alert("微信支付调起失败！");
          }
        })
        .catch((err) => {
          console.log(err);
        });*/
    },
    onBridgeReady(params) {
      var that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: params.appId, //公众号名称，由商户传入
          timeStamp: params.timeStamp, //支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: params.nonceStr, //支付签名随机串，不长于 32 位
          package: params.package, //统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: "MD5", //签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: params.sign, //支付签名
        },
        function (res) {
          if (res.err_msg === "get_brand_wcpay_request:ok") {
            alert("支付成功！");
            that.$router.push({ path: "/myOrder" });
          } else if (res.err_msg === "get_brand_wcpay_request:fail") {
            alert("支付失败！");
          }
        }
      );
    },
  },
  computed: {},
  mounted() {},
};
</script>
  <style lang="less" scoped>
.order {
  margin: 0;
  .bottom-btn {
    width: 500px;
    width: 200px;
    display: block;
    background-color: green;
  }
}
</style>