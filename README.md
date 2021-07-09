# MSFmultiSelect
MSFmultiSelect (multiselect) is a pure JavaScript user-friendly multiselect library, don't need jQuery. It's very easy to use for developers and fast.
### [Documentation (Demo)](https://minisuperfiles.blogspot.com/p/documentation.html?project=msfmultiselect) | [Try it (JSFiddle)](https://jsfiddle.net/minisuperfiles/r0L2yusd/) | [Download](https://github.com/minisuperfiles/MSFmultiSelect/archive/2.3.zip)
## Installation
Use npm to install the latest version.
```
npm i msfmultiselect
```
Import MSFmultiSelect and its stylesheet.
```javascript
import MSFmultiSelect from "msfmultiselect";
import 'msfmultiselect/msfmultiselect.min.css';
```
Alternatively, you can simply embed it in your HTML file.
```html
<script src="https://cdn.jsdelivr.net/gh/minisuperfiles/MSFmultiSelect/msfmultiselect.min.js"></script>
<link href="https://cdn.jsdelivr.net/gh/minisuperfiles/MSFmultiSelect/msfmultiselect.min.css" rel="stylesheet"/>
```
## Using Example
Add references to MSFmultiSelect’s JavaScript and Stylesheet.
```html
<script src="msfmultiselect.js"></script>
<link rel="stylesheet" href="msfmultiselect.css"/>
```
Select box container element.
```html
<div id="myselect">
  <select id="multiselect" name="languages[]" multiple="multiple">
    <option value="1" selected>HTML</option>
    <option value="2" selected>CSS</option>
    <option value="3">MySql</option>
    <option value="4">XML</option>
    <option value="5">JSON</option>
    <option value="6">YAML</option>
    <option value="7">MongoDB</option>
    <option value="8">SQLite</option>
  </select>
</div>
```
JavaScript code
```javascript
var select = new MSFmultiSelect(
  document.querySelector('#multiselect'),
  {
    selectAll: true,
    searchBox: true,
    onChange:function(checked, value, instance) {
      console.log(checked, value, instance);
    }
  }
);
```
## Syntax (arguments)
```
new MSFmultiSelect(element)
new MSFmultiSelect(element, settings)

element = document.getElementById('multiselect')
settings = {
  width: 350,
  height: 40,
  className: 'myclass',
  onChange: function(checked, value, instance) {
    console.log(checked, value, instance);
  },
  selectAll: true,
  searchBox: true,
  appendTo: '#myselect',
  readOnly: true,
  afterSelectAll: function(checked, values, instance) {
    console.log(checked, values, instance);
  },
  autoHide: false
}
```
### element
Give DOM select element, this element posted in your backend.
### settings (Optional)
Give the object of settings your multiselect.
<ol type="1"><li><b>appendTo</b> : give element selector string, it uses to target place to create multiselect.</li>
<li><b>width</b> : It is control of the mulitiselect width.</li>
  <li><b>height</b> :  It is control of the mulitiselect height.</li>
  <li><b>className</b> : if you need any custom style, give css class name, it will apply to mulitiselect.</li>
  <li><b>onChange</b> : When multiselect is changed this callback function will run. In this function, there are three parameters.<ol type="i"><li><b>checked</b> : you receive boolean data, selected item checked, or unchecked.</li>
  <li><b>value</b> : You get selected item value.</li>
  <li><b>instance</b> : It's instance variable of mulitiselect, you can access multiselect properties and methods</li></ol></li>
  <li><b>selectAll</b> : If your given value is true, then the select-all feature is will enable. It helps one click to select all options</li>
  <li><b>afterSelectAll</b> : When users click the select-all feature this callback function will run. In this function, there are three parameters.<ol type="i"><li><b>checked</b> : you receive boolean data, selected item checked, or unchecked.</li>
  <li><b>values</b> : You get selected item values in array.</li>
  <li><b>instance</b> : It's instance variable of mulitiselect, you can access multiselect properties and methods</li></ol></li>
  <li><b>searchBox</b> : If your given value is true, the search box feature is will enable. It helps to search the option values.</li>
  <li><b>theme</b> : There are two themes available. They are theme1 and theme2. theme1 is a regular multi-select, theme2 multi-select have directly remove selected value option button.</li>
  <li><b>autoHide</b> : If your given value is false, selectable values always displayed on the screen.</li></ol>
<h5>MSFmultiSelect Methods</h5><dl>
  <dt><code>MSFmultiSelect.setValue(sellectedValues, changeTrigger)</code></dt>
<dd>This method is used to add selected values, this method needs two arguments, sellectedValues argument value has select option values in an array format. If you changeTrigger argument value is true then it triggers to onChange event.<ul>
<li><b>code</b> : <code>select.setValue(['4','8']); //give select option values in array</code></li></ul></dd>
<dt><code>MSFmultiSelect.removeValue(removeSellectedValues, changeTrigger)</code></dt>
  <dd>This method is used to remove selected values, this method needs two arguments, removeSellectedValues argument value has select option values in an array format. If you changeTrigger argument value is true then it triggers to onChange event.<ul>
<li><b>code</b> : <code>select.removeValue(['4','8']); //give select option values in array</code></li></dd>
<dt><code>MSFmultiSelect.getData()</code></dt>
  <dd>This methods use to get selected values of mulitiselect<ul>
<li><b>code</b> : <code> console.log(select.getData());</code></li></ul></dd>
<dt><code>MSFmultiSelect.selectAll(ctrlSwitch)</code></dt>
  <dd>This method uses to select all option in the multiselect list or unselect all option in the list, this method needs one argument and its boolean value, if give true, select all option in multiselect list or you give false value unselect all in multiselect list.<ul>
<li><b>code</b> : <code> select.selectAll(true); select.selectAll(false);</code></li></ul></dd>
  <dt><code>MSFmultiSelect.loadSource(options)</code></dt>
  <dd>This method uses to load options in multiselect. This method needs one argument and its need array format.<ul>
<li><b>formet</b> : 
<pre><code>var options = [
    {caption:'optiontext1', value:'optionvalue1', selected:true},
    {caption:'optiontext2', value:'optionvalue2', selected:false}
];</code></pre>
</li>
</ul></dd><dt><code>MSFmultiSelect.getSource()</code></dt>
<dd>This method uses to get current source data, it will return the array format.<ul>
<li><b>code</b> : <code> console.log(select.getSource());</code></li></ul></dd><dt><code>MSFmultiSelect.reload()</code></dt><dd>This use to recreate the mulitselect.<ul>
<li><b>code</b> : <code>select.reload();</code></li></ul></dd></dl>


Learn more about in [minisuperfiles.blogspot.com](https://minisuperfiles.blogspot.com)
