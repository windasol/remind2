<template>
    <h1>청각 암산테스트</h1>
    <div class="number" v-if="endFlag">
        <div style="margin-left: 0.8em;">{{ num }}</div>
        <div>x {{ num1 }}</div>
    </div>        
  

    계산결과
    <input v-model="inputResult" class="result"/>    

    <div style="margin-right: 5.8em; margin-top: 0.3em;">
        기계음이 나온횟수는?
        <input v-model="inputBitReuslt" class="result" />
    </div>
    
    <div class="version">        
        <select @change="changeRouter($event)" v-if="!endFlag">
            <option v-for="data in combo" :value="data.value" :key="data">{{ data.description }}</option>   
        </select>   
    </div>
        
    <div>
        <button v-if="!endFlag" class="btnStart" @click="init" style="background-color: orange;">시작하기</button>    
        <button v-if="!endFlag" class="btnStart" @click="check" style="background-color: green;">검사하기</button>
        <button v-if="!endFlag" class="btnStart" @click="answerCheck" style="background-color: red;">정답 확인하기</button>
    </div>

    <audio class="player" ref="player">
        <source src="../music/bit.mp3" ref="source"> 
    </audio>

</template>
  
  
  <script>
  
export default {
    components: {  
      
    },
    data() {
      return {
        num : 0,
        num1: 0,  
        reuslt: 0, 
        inputResult: "",
        bitResult: 0,
        inputBitReuslt: "",
        combo: [
            {value: "/version3", description: "version 3"},
            {value: "/", description: "version 1"},
            {value: "/version2", description: "version 2"},        
        ],  
        endFlag: false,                   
      };
    },    
    methods: {
        async init() {
            this.reset();

            this.num = Math.floor((Math.random() * (100 - 10))) + 10;
            this.num1 = Math.floor((Math.random() * (100 - 10))) + 10;                                    
            let range = Math.floor((Math.random() * (12 - 3))) + 3;                                    
            this.reuslt = this.num * this.num1;
            
            this.timeOut();


            // const currentTime = new Date();	          
            // let flag = true;

            // while(flag) {
            //     const oldTime = new Date();
                
            //     const diff = currentTime - oldTime;        
            //     const sec = Math.floor(diff / 1000);              
            //     if(sec < -10) {
            //         flag = false;                    
            //         break;                    
            //     }        

            //     this.sound();          
            //     await this.delay(800);
            // }

            for(let i = 1; i <= range; i++) {
                this.sound();
                await this.delay(850)
            }
            
            await this.end();
        },
        changeRouter(event) {                  
            this.$router.push( { path : event.target.value });
        },
        check() {
            let str = "";

            if(this.inputResult == this.reuslt) {
                str += "암산 계산 "
            } 
            if (this.inputBitReuslt == this.bitResult) {
                str += "기계음 개수 "
            } 

            if(this.inputResult != this.reuslt && this.inputBitReuslt != this.bitResult) {
                alert("ㅉㅉ 하나도 못맞추네");
                return;
            }

            alert(str + "(을)를 맞추었습니다");

        },
        sound() {                    
            const sound = this.$refs.player;                    
            sound.play();         
            this.bitResult += 1;                           
        },
        delay(ms) {                  
            return new Promise(r => setTimeout(r,ms));
        }, 
        end() {
            const sound = this.$refs.player;                    
            sound.pause();                       
            sound.currentTime = 0;                             
        },
        reset() {                   
            this.endFlag = true;
            this.inputResult = "" ;
            this.inputBitReuslt = "";
            this.bitResult = 0;            
        },
        answerCheck() {
            alert("계산 결과 : " + this.reuslt + "  " + "기계음 개수 : " + this.bitResult);
        },
        timeOut() {
            setTimeout(()=> {
                this.endFlag = false;
            }, "8000");
        },
    },  
  }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.number {
    font-size: 30px;
    margin-top: 1em;
    margin-bottom: 1em;
}

.btnStart {
  height: 50px; 
  font-weight: 500; 
  background-color: #00A5FF;
  border: solid white;  
  margin: 1.5em;
  color: white;
  font-size: 13px;
}

.result {
    width: 80px;
    height: 20px;
}
  
.version {
    margin-right: 14.5em;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
}  
</style>
  