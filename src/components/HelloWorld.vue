<template>  
    <p v-if="!startFlag" class="title">기억력 테스트</p>
    <div class="stage" id="stage">  
      <Transition name="fade">
        <p v-if="show">{{data}}</p>    
      </Transition>  
    </div> 
   
    <div v-if="endFlag">
      <input v-for="(row, idx) in stage.length" :key="row" v-model="inputData[idx]" class="input">
    </div>  
    <div v-if="answerCheck">
      <input v-for="(row, idx) in stage.length" :key="row" v-model="stage[idx]" class="input">
    </div>  
  
  
    <div v-if="!endFlag && !startFlag">
      <button class="btnStart" @click="init">테스트 시작</button>     
    </div>
    <div>
      <select @change="changeRouter($event)">
        <option v-for="data in combo" :value="data.value" :key="data">{{ data.description }}</option>   
      </select>   
      <select v-model="level" class="button">
        <option v-for="value in 10" :value="value" :key="value">LEVEL {{ value }}</option>
      </select>
      <select v-model="time" class="button">
        <option v-for="value in 20" :value="value / 10" :key="value">{{ value / 10 }} 초</option>   
      </select>   
    </div>
    <div v-if="endFlag">
      <button class="btnStart" @click="check" style="background-color: orange;">검사하기</button>
      <button class="btnStart" @click="answerCheck= !answerCheck" style="background-color: red;">정답 확인하기</button>
      <button class="btnStart" @click="reset" style="background-color: green;">처음으로</button>
    </div>  
  
    <div>
      <button class="btnStart" @click="song" style="background-color: slateblue">힐링 음악</button>  
      <button class="btnStart" @click="songPasue" style="background-color: steelblue">중지</button>  
    </div>

    <audio class="player" ref="player">
        <source src="../music/song1.mp3" ref="source"> 
    </audio>
    
</template>


<script>

export default {
  components: {  
    
  },
  data() {
    return {
      stage: [],
      level: 1,
      time: 0.1,
      data: "",
      show: true,   
      startFlag: false,  
      endFlag: false, 
      inputData: [],
      answerCheck: false,  
      combo: [
        {value: "/", description: "version 1"},
        {value: "/version2", description: "version 2"},
        {value: "/version3", description: "version 3"}
      ]      
    };
  },
  mounted() {    
  },
  methods: {
    init() {
      this.startFlag = true;
      this.stage = [];
      this.inputData = [];
      let random = [];
      let length = this.level + 3;
      random = Array.from({ length: 26 }, (v, i) => String.fromCharCode(i + 65));
      for(let i = 1; i < 10; i++) {
        random.push(i);
      }
            
      for(let i = 0; i < length; i++) {
        let num = Math.floor(Math.random() * 35);
        this.stage.push(random[num].toString());
        this.inputData.push("");
      }

      console.log(this.stage);

      this.bind();

    },
    async bind() {                        
      for(let i = 0; i < this.stage.length; i++) {        
        this.data = this.stage[i];        
        this.show = true;    
        await this.delay(this.time * 1000);
        this.show = false;        
        await this.delay(this.time * 1000);        
      }      

      this.startFlag = false;
      this.endFlag = true;
    },
    delay(ms) {                  
      return new Promise(r => setTimeout(r,ms));
    }, 
    check() {
      let count = 0;
      this.stage.forEach((e,i)=> {        
        if(e == this.inputData[i]) {
          count++;
        }        
      });
      alert(count + "개 맞추었습니다");      
    },
    reset() {
      this.endFlag = false;
      this.startFlag = false;
      this.answerCheck = false;
      this.inputData = [];
    },
    changeRouter(event) {                  
      this.$router.push( { path : event.target.value });
    },
    song() {
      const sound = this.$refs.player;                    
      sound.play(); 
    },
    songPasue() {
      const sound = this.$refs.player;                    
      sound.pause();                               
    }
  },  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stage {
  color: black;
  font-size: 120px;  
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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

.input {
  width: 50px; 
  height: 30px; 
  align-items: center;
}
.button {
  margin: 1.5em;
}

.title {
  font-size: 40px
}

</style>

