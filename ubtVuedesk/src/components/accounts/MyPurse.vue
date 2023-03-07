<template>
  <div class="purse">
    <img src="@/assets/imgs/leftArrow.png" class="arrow" @click="$router.push({path:'/myaccount'})" alt="">
    <div class="content">
        <div class="money_wrap">
            <h2 class="balance">余额</h2>
            <div class="money">
                <p class="money_num">0.00</p>
                <p>单位（元）</p>
            </div>
        </div>
        <div class="money_operator">
            <button class="recharge">充值</button>
            <button class="Withdrawals">提现</button>
        </div>
    </div>
    <div class="details"><p>---交易明细---</p></div>
    <div>
        
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
    .purse{
        width: 100%;
        position: relative;
        overflow: hidden;
        // 返回上一页面箭头
        .arrow{
            position: absolute;
            top:20px;
            left:30px;
            width: 30px;
            cursor: pointer;
        }
        // 钱包
        .content{
            width: 600px;
            height: 300px;
            border-radius: 20px;
            background: rgb(40,223,58);
            margin:50px auto 0;
            display: flex;
            flex-direction: column;
            border: 1px solid #333;
            // 钱包金额
            .money_wrap{
                width: 100%;
                height: 200px;
                border-bottom:1px solid black;
                box-sizing: border-box;
                padding: 30px 50px;
                display: flex;
                flex-direction: column;
                h2{
                    height: 40px;
                    line-height: 40px;
                }
                .money{
                    flex:1;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    p{
                        font-size:20px
                    }
                    .money_num{
                        font-weight: bold;
                        font-size: 30px;
                    }
                }
            }
            // 钱包操作，充值提现
            .money_operator{
                flex:1;
                display: flex;
                justify-content: space-around;
                align-items: center;
                button{
                    width: 100px;
                    height: 40px;
                    background: yellow;
                    cursor:pointer
                }
            }
        }
        .details{
            width: 120px;
            margin:20px auto;
        }
    }
</style>