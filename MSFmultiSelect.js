/* MSFmultiSelect v1.00
 * Developed by Jagadeesan S
 * jagadeesanjd11@gamil.com
 * Refactored by Bala Vallivel
 * https://minisuperfiles.blogspot.com
 */
class MSFmultiSelect {
  constructor(select, settings = {}) {
    this.select = select;
    this.select.multiple = true;
    this.select.style.display = 'none';

    this.settings = this._getSettings(settings);
    var prefix = 'msf_';

    this.class = {
      prefix: prefix + 'multiselect',
      rootContainer: prefix + 'multiselect_container',
      logger: 'logger',
      searchBox: 'searchbox',
      list: prefix + 'multiselect'
    };
    this.data = {};

    this.create();
    this.log();
  }
  _getSettings(settings) {
    var defultSettings = {
      theme: 'simple',
      width: '350px',
      height: '40px',
      appendTo:'body',
      className: ''
    };

    var defultSettingsKeys = Object.keys(defultSettings);
    var i, attr, defultSettingsKeyslen = defultSettingsKeys.length;
    for (i = 0; i < defultSettingsKeyslen; i++) {
      attr = defultSettingsKeys[i];

      if (attr && settings[attr] !== undefined) continue;
      settings[attr] = defultSettings[attr];
    }

    settings['width'] = this._setpixel(settings['width']);
    settings['height'] = this._setpixel(settings['height']);

    return settings;
  }
  _setpixel(value) {
    if (!value) { return; }
    // Here value has string return the value, otherwise px will be added.
    return isNaN(value) ? value : value + 'px';
  }
  create() {
    var self = this;
    var addTarget = document.querySelector(this.settings.appendTo);
    var div = document.createElement('DIV');
    div.className = this.class.rootContainer;
    div.id = this.class.prefix + (document.querySelectorAll('.' + this.class.rootContainer).length + 1);

    // Creating theme specific elements here.
    this.settings['theme'] === 'simple' ?
      this._getThemeOneSpecificElems(div) : this._getThemeTwoSpecificElems(div);

    // Creating common elements for both themes here.
    this._getCommonElems(div);

    this.container = div;
    addTarget.appendChild(div);
    // add event
    document.addEventListener('click', function(event) {
      var theme2Specific = self.settings['theme'] === 'simple' ? false : event.target.className === 'closeBtn';
      if (self.container.contains(event.target) || theme2Specific) return;
      self.list.classList.add('hidden');
      self.logger.classList.remove('open');
    });

    if (this.settings.searchBox) {
      var search = this._search.bind('', self);
      this.searchBox.addEventListener('keyup', search);
    }
  }
  _search(self, event) {
    var searchVal = event.target.value.toLocaleLowerCase();
    var options = self.list.querySelectorAll('li:not([class*=ignore])');

    self._showAllOptions();
    if (searchVal.length < 1) return;

    var i, optinVal, option, optionsLen = options.length;
    for (i = 0; i < optionsLen; i++) {
      option = options[i];
      optinVal = option.innerText.toLocaleLowerCase();

      if (optinVal.indexOf(searchVal) !== 0) {
        option.parentElement.classList.add('hidden');
      }
    }
  }
  _handleSearchBox() {
    if (!this.settings.searchBox) return;
    if (this.searchBox.value) { this.searchBox.value = ''; }
    this.searchBox.focus();
  }
  setValue(selected = []) {
    if (!selected.length) return;

    var selectChildrenLen = this.select.children.length,
    selectedLen = selected.length,
    selectChild, listChild, selectedIndex, list;
    list = this._getSearchableLi(this.list);
    var i, j;

    for (i = 0; i < selectChildrenLen; i++) {
      for (j = 0; j < selected.length; j++) {
        selectChild = this.select.children[i];
        selectedIndex = selected[j];

        // TODO: need to change != to !==.
        if (selectChild.value != selectedIndex) continue;

        selectChild.selected = true;
        listChild = list[i];
        listChild.children[0].checked = true;
        listChild.classList.add('active');
        this.data[i] = true;
        break;
      }
    }
    this.log();
    this.searchValClear();
  }
  removeValue(selected = []) {
    if (!selected.length) return;

    var selectChildrenLen = this.select.children.length,
    selectedLen = selected.length,
    selectChild, listChild, selectedIndex, list;
    list = this._getSearchableLi(this.list);
    var i, j;

    for (i = 0; i < selectChildrenLen; i++) {
      for (j = 0; j < selectedLen; j++) {
        selectChild = this.select.children[i];
        selectedIndex = selected[j];
        if (selectChild.value != selectedIndex) continue;

        selectChild.selected = false;
        listChild = list[i];
        listChild.children[0].checked = false;
        listChild.classList.remove('active');
        this.data[i] = false;
        break;
      }
    }
    this.log();
    this.searchValClear();
  }
  searchValClear() {
    if (!this.settings.searchBox) return;
    var searchResult, selectedSearchResult, selectAll;

    searchResult = this._getLi(this.list, 'label:not(.hidden) li:not(.ignore)');
    selectedSearchResult = this._getLi(this.list, 'label:not(.hidden) li.active:not(.ignore)');

    if (searchResult.length === selectedSearchResult.length || !selectedSearchResult.length) {
      this._handleSearchBox();
      this._showAllOptions();
    }
  }
  log() {
    this.settings['theme'] === 'simple' ?
      this._ThemeOneSpecific_log() : this._ThemeTwoSpecific_log();
  }
  getData() {
    var data = [];
    var i, selectChildrenLen = this.select.children.length;

    for (i = 0; i < selectChildrenLen; i++) {
      if (!this.select.children[i].selected) continue;
      data.push(this.select.children[i].value);
    }

    return data;
  }
  selectAll(isSetValue = false) {
    var data = [];
    var i, selectChildrenLen = this.select.children.length;

    for (i = 0; i < selectChildrenLen; i++) {
      data.push(this.select.children[i].value);
    }

    isSetValue ? this.setValue(data) : this.removeValue(data);
  }
  loadSource(data=[]) {
    if (data.length) {
      this.select.innerHTML = '';
      var i, dataLen = data.length, option, datum;

      for (i = 0; i < dataLen; i++) {
        datum = data[i];
        option = document.createElement('OPTION');
        option.value = datum.value;
        option.innerHTML = datum.caption;
        option.selected = datum.selected;
        this.select.appendChild(option);
      }
      this.reload();
    }
  }
  getSource() {
    var data=[], children = this.select.children;
    var childrenLen = children.length, i, child;

    for (i = 0;i < childrenLen; i++) {
      child = children[i];
      data.push({
        value: child.value,
        caption: child.innerText,
        selected: child.selected
      });
    }
    return data;
  }
  reload() {
    this.container.remove();
    this.create();
  }
  _showAllOptions() {
    if (this.list.classList.contains('hidden')) { this.list.classList.remove('hidden'); }
    var options = this._getSearchableLi(this.list);

    var i, optionsLen = options.length;
    for (i = 0; i < optionsLen; i++) {
      options[i].parentElement.classList.remove('hidden');
    }

  }
  _getCommonElems(wrapper) {
    var self = this;
    var searchBox, ul, li, label, input, caption;
    var i, selectChild, selectChildrenLen = this.select.children.length;

    ul = document.createElement('UL');
    ul.className = this.class.list;
    ul.style.width = this.settings.width;
    ul.classList.add('hidden');

    if (this.settings.searchBox) {
      label = document.createElement('label');
      li = document.createElement('LI');
      li.classList.add('ignore');

      searchBox = document.createElement('input');
      searchBox.type = 'text';
      searchBox.placeholder = 'Search';
      searchBox.className = this.class['searchBox'];

      li.appendChild(searchBox);
      label.appendChild(li);
      ul.appendChild(label);
      this.searchBox = searchBox;
    }

    if (this.settings.selectAll) {
      label = document.createElement('label');
      li = document.createElement('LI');
      li.classList.add('ignore');
      input = document.createElement('input');
      input.type = 'checkbox';
      input.disabled = this.settings.readOnly ? true : false;
      input.addEventListener('click', function() {
        var eventName = this.checked ? 'add' : 'remove';
        this.parentElement.classList[eventName]('active');
        self.selectAll(this.checked);
      });

      caption = document.createTextNode('<Select all>');
      li.appendChild(input);
      li.appendChild(caption);
      label.appendChild(li);
      ul.appendChild(label);
    }

    for (i = 0; i < selectChildrenLen; i++) {
      selectChild = this.select.children[i];
      label = document.createElement('label');
      li = document.createElement('LI');
      input = document.createElement('input');
      input.type = 'checkbox';
      input.disabled = this.settings.readOnly ? true : false;
      input.value = selectChild.value;

      caption = document.createTextNode(selectChild.innerText);
      input.addEventListener('click', function() {
        this.checked ? self.setValue([this.value]) : self.removeValue([this.value]);

        if(typeof self.settings.onChange == 'function') {
          self.settings.onChange(this.checked, this.value, self);
        }
      });
      li.appendChild(input);
      li.appendChild(caption);

      li.className = selectChild.selected ? 'active' : '';
      input.checked = selectChild.selected;
      this.data[i] = selectChild.selected;

      label.appendChild(li);
      ul.appendChild(label);
    }

    wrapper.appendChild(ul);
    this.list = ul;
  }
  _getSearchableLi(ul) {
    return ul.querySelectorAll('li:not([class*=ignore])');
  }
  _getLi(ul, selector = 'label') {
    return ul.querySelectorAll(selector);
  }
  _getThemeOneSpecificElems(wrapper) {
    var logger = document.createElement('textarea');
    this._setLogger(logger);
    logger.readOnly = true;

    wrapper.appendChild(logger);
  }
  _getThemeTwoSpecificElems(wrapper) {
    var logger = document.createElement('span');
    this._setLogger(logger);

    wrapper.appendChild(logger);
  }
  _setLogger(elem) {
    var self = this;
    elem.style.width = this.settings.width;
    elem.style.height = this.settings.height;
    elem.className = this.class.logger;
    this.logger = elem;

    elem.addEventListener('click', function() {
      self.list.classList.toggle('hidden');
      self.logger.classList.toggle('open');
      self._handleSearchBox();
    });
  }
  _ThemeOneSpecific_log() {
    var i = 0, option = '', selectedOptions = '';
    var loop_length = this.select.children.length;

    for(i; i < loop_length; i++) {
      option = this.select.children[i];
      if (!this.data[i]) continue;

      selectedOptions += selectedOptions ? ',' + option.innerText : option.innerText;
    }

    this.logger.value = selectedOptions;
  }
  _ThemeTwoSpecific_log() {
    var self = this;
    var logger = self.logger;
    logger.innerHTML = '';

    var i, option = '', selectedOptions = '', selectedLabels, closeBtn;
    var loop_length = this.select.children.length;

    for(i = 0; i < loop_length; i++) {
      option = this.select.children[i];
      if (!this.data[i]) continue;

      selectedLabels = document.createElement('label');
      selectedLabels.className = 'selectedLabels';
      selectedLabels.innerHTML = option.innerText;

      closeBtn = document.createElement('span');
      closeBtn.className = 'closeBtn';
      closeBtn.innerHTML = '&#10005;';
      closeBtn.dataset.id = option.value;
      closeBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        self.removeValue([event.target.dataset.id]);
      });

      selectedLabels.appendChild(closeBtn);
      logger.appendChild(selectedLabels);

      selectedOptions += selectedOptions ? ',' + option.innerText : option.innerText;
    }
    // TODO: update selectedOptions in input or select box.
    console.log(selectedOptions);
  }
}
