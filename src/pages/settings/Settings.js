
import './Settings.css';

export default function Settings() {
  return (
    <div id ="Body" title="Settings" >
    <h1>Setting Animation</h1>

   <div id = "SaveSetting">
   <form >
    <label for="level1"> Mốc tiền donate hiển thị Animation 1 </label> 
    <input type="text" id="level1" name="level1" placeholder="VND"></input>

    <label for="level2">Mốc tiền donate hiển thị Animation 2</label>
    <input type="text" id="level2" name="level1" placeholder="VND"></input>

    <label for="sizeAni"> Thiết lập kích cỡ Animation </label> 
    <select id="sizeAni" name="sizeAni">
      <option value="200x150">200x150</option>
      <option value="150x100">150x100</option>
      <option value="120x90">120x90</option>
    </select>
    <label for="delayAni"> Thiết lập thời gian delay của Animation </label> 
    <select id="delayAni" name="delayAni">
      <option value="5 giây">5 giây</option>
      <option value="4 giây">4 giây</option>
      <option value="3 giây">3 giây</option>
      <option value="2 giây">2 giây</option>
      <option value="1 giây">1 giây</option>
    </select>
  
    <input type="submit" value="Save"></input>
  </form>
  </div>
    </div>   
  );
}

