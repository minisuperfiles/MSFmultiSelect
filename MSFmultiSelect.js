/* MSFmultiSelect v1.00
 * Developed by Jagadeesan S
 * jagadeesanjd11@gamil.coms
 * https://minisuperfiles.blogspot.com
 */
class MSFmultiSelect{
  constructor(select, settings = {}) {
    this.select = select;
    this.select.multiple=true;
    this.select.style.display='none';

    this.settings = this._getSettings(settings);

    this.class = {
      searchBox: 'searchbox'
    };

    this.data = {};

    this.create();
    this.log();
    return this;
  }
  _getSettings(settings) {
    var defultSettings = {
      theme: 'advanced',
      width: '350px',
      height: '20px',
      appendTo:'body',
      className: ''
    };

    Object.keys(defultSettings).forEach(function(attr) {
      if (attr && settings[attr] !== undefined) return;
      settings[attr] = defultSettings[attr];
    });

    return settings;
  }
  create(){
    var self = this;
    var addTarget = document.querySelector(this.settings.appendTo);
    var div=document.createElement('DIV');
    div.className='msf_multiselect_container';
    this.id='msf_multiselect_'+(document.querySelectorAll('.msf_multiselect_container').length+1);
    div.id=this.id;

    // Creating theme specific elements here.
    this.settings['theme'] === 'simple' ?
      this._getThemeOneSpecificElems(div) : this._getThemeTwoSpecificElems(div);

    // Creating common elements for both themes here.
    this._getCommonElems(div);

    this.container=div;
    addTarget.appendChild(div);
    // add event
    document.addEventListener('click', function(event) {
      var theme2Specific = self.settings['theme'] === 'simple' ? false : event.target.className === 'closeBtn';
      if (self.container.contains(event.target) || theme2Specific) return;
      self.list.classList.add('hidden');
      self.searchBox.classList.add('hidden');
    });

    this.searchBox.addEventListener('keyup', function(event) {
      var searchVal = event.originalTarget.value.toLocaleLowerCase();
      var options = document.querySelectorAll('.msf_multiselect label li');

      self._showAllOptions();
      if (searchVal.length < 1) return;

      var optinVal;
      options.forEach(function(option) {
        optinVal = option.innerText.toLocaleLowerCase();

        if (optinVal === '<select all>') return;
        if (optinVal.indexOf(searchVal) !== 0) {
          option.parentElement.classList.add('hidden');
        }
      });
    });
  }
  setValue(selected=[]){
    if(selected.length){
      for(var i=0; i<this.select.children.length; i++){
        for(var j=0; j<selected.length; j++){
          if(this.select.children[i].value==selected[j]){
            this.select.children[i].selected=true;
            var sync=(this.settings.selectAll) ? (i+1) : i;
            this.list.children[sync].children[0].children[0].checked=true;
            this.list.children[sync].children[0].className='active'; //need to change;
            this.data[i] = 1;
            break;
          }
        }
      }
      this.log();

      this.searchBox.value = '';
      this.searchBox.focus();
      this._showAllOptions();
    }
  }
  removeValue(selected=[]){
    if(selected.length){
      for(var i=0; i<this.select.children.length; i++){
        for(var j=0; j<selected.length; j++){
          if(this.select.children[i].value==selected[j]){
            this.select.children[i].selected=false;
            var sync=(this.settings.selectAll) ? (i+1) : i;
            this.list.children[sync].children[0].children[0].checked=false;
            this.list.children[sync].children[0].className=''; //need to change;
            this.data[i] = 0;
            break;
          }
        }
      }
      this.log();
    }
  }
  log() {
    this.settings['theme'] === 'simple' ?
      this._ThemeOneSpecific_log() : this._ThemeTwoSpecific_log();
  }
  getData(){
    var data=[];
    for(var i=0; i<this.select.children.length; i++){
      if(this.select.children[i].selected){
        data.push(this.select.children[i].value);
      }
    }
    return data;
  }
  selectAll(is=false){
    var data=[];
    for(var i=0; i<this.select.children.length; i++){
      data.push(this.select.children[i].value);
    }
    if(is){
      this.setValue(data);
    }else{
      this.removeValue(data);
    }
  }
  loadSource(data=[]){
    if(data.length!=0){
      this.select.innerHTML='';
      for(var i=0; i<data.length; i++){
        var option=document.createElement('OPTION');
        option.value=data[i].value;
        option.innerHTML=data[i].caption;
        option.selected=data[i].selected;
        this.select.appendChild(option);
      }
      this.reload();
    }
  }
  getSource(){
    var data=[];
    for(var i=0; i<this.select.children.length; i++){
      data.push({value:this.select.children[i].value,caption:this.select.children[i].innerText,selected:this.select.children[i].selected});
    }
    return data;
  }
  reload(){
    this.container.remove();
    this.create();
  }
  _showAllOptions() {
    if (this.list.classList.contains('hidden')) this.list.remove('hidden');
    var options = document.querySelectorAll('.msf_multiselect label li');

    options.forEach(function(option) {
      option.parentElement.classList.remove('hidden');
    });
  }
  _getCommonElems(wrapper) {
    var self = this;

    var searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.className = this.class['searchBox'];
    // TODO: we should set px or other styles in constructor.
    searchBox.style.width = this.settings.width;
    searchBox.classList.add('hidden');

    var ul = document.createElement('UL');
    ul.className = 'msf_multiselect';
    ul.style.width = this.settings.width;
    ul.classList.add('hidden');

    if(this.settings.selectAll){
      var label=document.createElement('label');
      var li=document.createElement('LI');
      var input=document.createElement('input');
      input.type='checkbox';
      input.disabled=(this.settings.readOnly) ? true: false;
      input.addEventListener('click',function(){
        this.parentElement.className=(this.checked) ? 'active' : '';
        self.selectAll(this.checked);
      });
      var caption=document.createTextNode('<Select all>');
      li.appendChild(input);
      li.appendChild(caption);
      label.appendChild(li);
      ul.appendChild(label);
    }

    for(var i=0,len=this.select.children.length; i<len; i++){
      var label=document.createElement('label');
      var li=document.createElement('LI');
      var input=document.createElement('input');
      input.type='checkbox';
      input.disabled=(this.settings.readOnly) ? true: false;
      input.value=this.select.children[i].value;

      var caption=document.createTextNode(this.select.children[i].innerText);
      input.addEventListener('click',function(){
        if(this.checked){
          self.setValue([this.value]);
        }else{
          self.removeValue([this.value]);
        }
        if(typeof self.settings.onChange=='function'){
          self.settings.onChange(this.checked,this.value,self);
        }
      });
      li.appendChild(input);
      li.appendChild(caption);
      if(this.select.children[i].selected){
        li.className='active';
        input.checked=true;
        this.data[i] = 1;
      }else{
        li.className='';
        input.checked=false;
        this.data[i] = 0;
      }
      label.appendChild(li);
      ul.appendChild(label);
    }

    wrapper.appendChild(searchBox);
    wrapper.appendChild(ul);

    this.list = ul;
    this.searchBox = searchBox;
  }
  _getThemeOneSpecificElems(wrapper) {
    var self = this;
    var textarea=document.createElement('textarea');
    textarea.style.height = this.settings.height;
    textarea.style.width = this.settings.width;
    textarea.className = this.settings.className;
    textarea.readOnly = true;

    this.logger=textarea;
    wrapper.appendChild(textarea);

    this.logger.addEventListener('click', function() {
      self.list.classList.toggle('hidden');
      self.searchBox.classList.toggle('hidden');
      if (!self.searchBox.classList.contains('hidden')) self.searchBox.focus();
    });
  }
  _getThemeTwoSpecificElems(wrapper) {
    // TODO: this is temporary fix. we need to implement separate element for theme2.
    this._getThemeOneSpecificElems(wrapper);

    var selectedLabelsDiv = document.createElement('div');
    selectedLabelsDiv.className = 'selectedLabelsDiv';
    selectedLabelsDiv.style.width = this.settings.width;
    wrapper.appendChild(selectedLabelsDiv);
  }
  _ThemeOneSpecific_log() {
    var i = 0, option = '', selectedOptions = '';
    var loop_length = this.select.children.length;

    for(i; i < loop_length; i++) {
      option = this.select.children[i];
      if (!this.data[i]) {
        continue;
      }

      selectedOptions += selectedOptions ? ',' + option.innerText : option.innerText;
    }

    this.logger.value = selectedOptions;
  }
  _ThemeTwoSpecific_log() {
    var self=this;
    var selectedLabelsDiv = document.getElementsByClassName('selectedLabelsDiv')[0];
    selectedLabelsDiv.innerHTML = '';

    var i = 0, option = '', selectedOptions = '';
    var loop_length = this.select.children.length;

    for(i; i < loop_length; i++) {
      option = this.select.children[i];
      if (!this.data[i]) {
        continue;
      }

      var selectedLabels = document.createElement('label');
      selectedLabels.className = 'selectedLabels';
      selectedLabels.innerHTML = option.innerText;

      var closeBtn = document.createElement('span');
      closeBtn.className = 'closeBtn';
      closeBtn.innerHTML = 'X';
      closeBtn.dataset.id = option.value;
      closeBtn.addEventListener('click', function(event) {
        self.removeValue([event.originalTarget.dataset.id]);
      });

      selectedLabels.appendChild(closeBtn);
      selectedLabelsDiv.appendChild(selectedLabels);

      selectedOptions += selectedOptions ? ',' + option.innerText : option.innerText;
    }
    // TODO: update selectedOptions in input or select box.
    console.log(selectedOptions);
  }
}
