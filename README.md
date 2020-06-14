# MSFmultiSelect
MSFmultiSelect (multiselect) is pure JavaScript user friendly multiselect plugin, don't need jQuery. It's very easy to use for developer and fast. (web development tool)
<h5>Example Code</h5>
<pre>
<code>
&lt;script src="MSFmultiSelect.js"&gt;&lt;/script&gt;
&lt;link rel="stylesheet" type="text/css" href="MSFmultiSelect.css"/&gt;
&lt;div id='myselect'&gt;
  &lt;select id='muliselect' name='countries[]' multiple='multiple'&gt;
    &lt;option value='1' selected='selected'&gt;Iceland&lt;/option&gt;
    &lt;option value='2' selected='selected'&gt;Indonesia&lt;/option&gt;
    &lt;option value='3' selected='selected'&gt;India&lt;/option&gt;
    &lt;option value='4'&gt;Iran&lt;/option&gt;
    &lt;option value='5'&gt;Iraq&lt;/option&gt;
    &lt;option value='6'&gt;Ireland&lt;/option&gt;
    &lt;option value='7'&gt;Isle of Man&lt;/option&gt;
    &lt;option value='8'&gt;Israel&lt;/option&gt;
  &lt;/select&gt;
&lt;/div&gt;
&lt;script&gt;
var select = new MSFmultiSelect(
 document.querySelector('#muliselect'),
 { 
  onChange:function(checked,value,instance){
   console.log(checked,value,instance); 
  },
  selectAll:true,
  appendTo:'#myselect' 
 } 
);
&lt;/script&gt;
</code>
</pre>

<h5>Syntax (arguments)</h5>

<pre>
<code>
new MSFmultiSelect(element)
new MSFmultiSelect(element,settings)

element = document.getElementById('muliselect')
settings = { 
 width:350,
 height:40,
 className:'myclass',
 onChange:function(checked,value,instance){
  console.log(checked,value,instance);
 },
 selectAll:true,
 appendTo:'#myselect',
 readOnly:true
}
</code>
</pre>
<h5>element</h5>Give DOM select element, this element posted in your backend.
<h5>settings (Optional)</h5>Give object of settings your mulitiselect.
<ol type="1"><li><b>appendTo</b> : give element selector string, it use to target place to create mulitselect.</li>
<li><b>width</b> : It is control of the mulitiselect width.</li><li><b>height</b> : It is control of the mulitiselect height.</li><li><b>className</b> : if you need any custom style, give css class name, it will apply into mulitiselect.</li><li><b>onChange</b> : when it changed, this callback function, there are three parameter in this function.<ol type="i"><li><b>checked</b> : you recevie boolen data, selected item checked or unchecked.</li><li><b>value</b> : you recevie selected item value.</li><li><b>instance</b> :  it's instance veriable of mulitiselect, you can access multiselect properties and methods.</li></ol></li><li><b>selectAll</b> : if you give true value, select all option enable.</li><li><b>readOnly</b> : if you give true value, user can not modify multiselect option.</li></ol>
<h5>MSFmultiSelect Methods</h5><dl><dt><code>MSFmultiSelect.setValue(sellectedValues)</code></dt>
<dd>This methods used to add sellected values, this methods need one argument, that argument value has select option values in array format.<ul>
<li><b>code</b> : <code>select.setValue(['4','8']); //give select option values in array</code></li></ul></dd>
<dt><code>MSFmultiSelect.removeValue(removeSellectedValues)</code></dt><dd>This methods used to remove sellected values, this methods need one argument, that argument value has select option values in array format.<ul>
<li><b>code</b> : <code>select.removeValue(['4','8']); //give select option values in array</code></li></dd>
<dt><code>MSFmultiSelect.getData()</code></dt><dd>This methods use to get selected values of muliti select<ul>
<li><b>code</b> : <code> console.log(select.getData());</code></li></ul></dd>
<dt><code>MSFmultiSelect.selectAll(ctrlSwitch)</code></dt><dd>This methods use to select all option in the mulitselect list or unselect all option in the list, this methods need one argument and its boolen value, if give true, select all option in mulitselect list or you give false value unselect all in multiselect list.<ul>
<li><b>code</b> : <code> select.selectAll(true); select.selectAll(false);</code></li></ul></dd><dt><code>MSFmultiSelect.loadSource(options)</code></dt><dd>This methods use to load option in mulitselect. This methods need one argument and its need array format.<ul>
<li><b>formet</b> : <pre>
<code>
    var options=[
        {caption:'optiontext1',value:'optionvalue1',selected:true},
        {caption:'optiontext2',value:'optionvalue2',selected:false}
    ];</code></pre></li>
</ul></dd><dt><code>MSFmultiSelect.getSource()</code></dt>
<dd>This methods use to get current source data, it will return array format.<ul>
<li><b>code</b> : <code> console.log(select.getSource());</code></li></ul></dd><dt><code>MSFmultiSelect.reload()</code></dt><dd>This use to recreate the mulitselect.<ul>
<li><b>code</b> : <code>select.reload();</code></li></ul></dd></dl>
