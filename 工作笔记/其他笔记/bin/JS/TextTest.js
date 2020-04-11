/*
工作流名称是：
AccDetail490
AccountDetail490
CheckBlackList4DebitCard
CheckStatus4PBAccntAndPB
CT006005
CT0090022
CT009PBStatus
CT0270005
CT029002B
CT029004B
CT032001A
CT048001B
CT048001C
CT048002A
CT052001B
CT052001C
CT058003D
CT0640001
CT903001E
GetAccntList4CSH
GetCardList4CSH
GetMediumNum
调用此CI交易码的C端有（AccountDetail490）：
页面调用：CS003==>CS003001
页面调用：CS033==>CS033001
页面调用：CS033==>CS033001001
调用此CI交易码的C端子流有（CheckBlackList4DebitCard）：
CS045==>InsertOtherBankCard
调用此CI交易码的C端有（CheckBlackList4DebitCard）：
页面调用：CS033==>CS033001001
PublicInsertCard
调用此CI交易码的C端子流有（CheckStatus4PBAccntAndPB）：
PublicPassBook==>ReadPassBook
调用此CI交易码的C端子流有（CT009PBStatus）：
页面调用：CS009==>CS009H==>CS00902101
CS009==>CS009I
页面调用：CS009==>CS009I==>CS009023
页面调用：CS009==>CS009I==>CS00902304
CS009==>CS009J
页面调用：CS009==>CS009J==>CS009026
调用此CI交易码的C端有（CT009PBStatus）：
CS009B
页面调用：CS009B==>CS009002
页面调用：CS009B==>CS00900201
CS009C
页面调用：CS009F==>CS009005
CS009G
页面调用：CS009G==>CS009017
CSEStore
页面调用：CSEStore==>CSEStore09
页面调用：CSEStore==>CSEStore0902
调用此CI交易码的C端有（CT0270005）：
CS027
调用此CI交易码的C端有（CT029002B）：
页面调用：CS003==>CS003001001
页面调用：CS030==>CS030005
页面调用：CS031==>CS031003
页面调用：CS031==>CS031004
CS037
CS039
页面调用：CS039==>CS03900101
CS040
页面调用：CS043==>CS043002
调用此CI交易码的C端有（CT029004B）：
页面调用：CS031==>CS031004
CS039
调用此CI交易码的C端子流有（CT032001A）：
CS064==>CS064B
调用此CI交易码的C端有（CT032001A）：
CS032
调用此CI交易码的C端有（CT048002A）：
页面调用：CS048==>CS04800201
调用此CI交易码的C端子流有（CT0640001）：
CS064==>CS064A
调用此CI交易码的C端子流有（GetAccntList4CSH）：
CS901==>UsePassBook
CS901==>UsePassBookFix
调用此CI交易码的C端有（GetAccntList4CSH）：
CS901
CS902
*/





var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
        // 如果 question 发生改变，这个函数就会运行
        question: function (newQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.getAnswer()
        }
    },
    methods: {
        // _.debounce 是一个通过 lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问yesno.wtf/api的频率
        // ajax请求直到用户输入完毕才会发出
        // 学习更多关于 _.debounce function (and its cousin
        // _.throttle), 参考: https://lodash.com/docs#debounce
        getAnswer: _.debounce(
            function () {
                var vm = this
                if (this.question.indexOf('?') === -1) {
                    vm.answer = 'Questions usually contain a question mark. ;-)'
                    return
                }
                vm.answer = 'Thinking...'
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = _.capitalize(response.data.answer)
                    })
                    .catch(function (error) {
                        vm.answer = 'Error! Could not reach the API. ' + error
                    })
            },
            // 这是我们为用户停止输入等待的毫秒数
            500)
    }
})