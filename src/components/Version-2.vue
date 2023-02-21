<template>  
    <h1>순간기억력 테스트</h1>
    <div class="title">
        <table class="stage_container" style="margin-left: 1em;">
            <tbody class="stage">
                <tr v-for="(y, idx) in level" :key="`y-${idx}`">
                    <td v-for="(x, index) in 5" :key="`x-${index}`" :id="`${x + (5 * (y -1))}`" class="check" >
                        {{ data ? data[x + (5 * (y -1)) - 1] : "" }}
                    </td>
                </tr>
            </tbody>
        </table>  
        <table class="stage_container" style="margin-left: 1em;">
            <tbody >
                <tr v-for="(y, idx) in level" :key="`y-${idx}`">    
                    <input v-for="(x, index) in 5" :key="`x-${index}`" class="input" v-model="inputData[x + (5 * (y -1)) - 1]" @input="moveFoucs(e, ((y-1) * 5) + x)" maxlength="1" :ref="`key-${((y-1) * 5) + x}`" />                    
                </tr>
            </tbody>
        </table>  
    </div>
    <div>
        <div class="bottom-top">
            <select @change="changeRouter($event)" style="margin-right: 1em;">
                <option v-for="data in combo" :value="data.value" :key="data" >{{ data.description }}</option>   
            </select>     
            <select v-model="select" style="margin-right: 1em;">
                <option v-for="x in 10" :key="x" :value="x * 1000">{{ x }}초</option>
            </select>
            <select v-model="level" @change="reset">
                <option v-for="x in 5" :key="x" :value="x ">LEVEL {{ x }} </option>
            </select>
        </div>
        
        <div class="bottom-title">
            <button class="btnStart" @click="check" style="background-color: orange;">검사</button>
            <button class="btnStart" @click="start">시작</button>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data()  {
        return {
            random: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9"],
            inputData: [],
            data: [],
            select: 1000, 
            level: 1,     
            change: false,
            combo: [
                {value: "/version2", description: "version 2"},
                {value: "/", description: "version 1"},                                                
                {value: "/version3", description: "version 3"}
            ]   
        };
    },
    mounted() {
        this.init();    
    },
    methods: {
        async init() {      
            await this.randoms();
            await this.delay(Number(this.select));        
            for(let i = 1; i <= this.level * 5; i++) {
                this.colorChange(i.toString(), "black");        
            }   

        },
        randoms() {        
            for(let i = 1; i <= this.level * 5; i++) {
                let num = Math.floor(Math.random() * 35);
                this.data.push(this.random[num]);
                this.inputData.push("");
            }      
        },
        delay(ms) {                  
            return new Promise(r => setTimeout(r,ms));
        }, 
        async check() {
            let count = 0;
            this.data.forEach((e,i)=> {
            if(e == this.inputData[i]) {
                count++;
            }
            });
            alert(count + "개 맞추셧습니다");
            for(let i = 0; i <= (this.level * 5) - 1; i++) {
            let color = "white";
            if(this.data[i] == this.inputData[i]) {
                color = "green";
            }
            await this.delay(250);
            this.colorChange((i + 1).toString(), color);   
            }   
        },
        start() {      
            for(let i = 1; i <= this.level * 5; i++) {
                this.colorChange(i.toString(), "white");
            }            
            this.data = [];
            this.inputData = [];
            this.init();
        },
        async colorChange(id, color) {      
            document.getElementById(id).style.backgroundColor = color;    
        },
        reset() {            
            for(let i = 1; i <= this.level * 5; i++) {
                this.colorChange(i.toString(), "black");   
            }
        },
        changeRouter(event) {
            this.$router.push( { path: event.target.value });
        },
        moveFoucs(e,idx) {     
            const next = "key-" +  (idx + 1);                        
            this.$refs[next][0].focus();                 
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
    display:flex;  
    justify-content: center;  
    margin-top: 5em;
}
.stage {
    margin: 0 auto;
    outline: 2px solid black;
    background-color: white;
}
.stage > tr {
    width: 100%;
    height: 25px;
}
.stage > tr > td {
    width: 25px;
    height: 25px;
    outline: 1px solid black;
}
.input {
    width: 25px;
    height: 25px;
}

.check {
    width: 20px;
    height: 20px; 
    font-size: 20pt;
    text-align: center;
    color: black;
}
.bottom {
    width: 15px; 
    height: 15px;
    margin: 1em;
}
.boxs {
    width: 50px;
    height: 30px;    
}
.bottom-title {
    margin-left: 3em;
    margin-top: 1em;    
    margin-right: 2em;
}

.btnStart {
  height: 50px; 
  width: 80px;
  font-weight: 500; 
  background-color: #00A5FF;
  border: solid white;  
  margin: 1.5em;
  color: white;
  font-size: 13px;
}

.input2 {
    border: white;
    width: 20px;
    height: 20px;
}

.bottom-top {
    margin-top: 5em;
}
</style>