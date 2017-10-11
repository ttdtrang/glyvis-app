/**
 * Provide a selectized dropdown.
 *
 * @param {Element} _parentElement the child element, for example that returned by document.getElementById("#myname"). Note that this SelectMenu requires a parentElement, rather than a string for parentSelector as in the constructor of other components.
 * @param {string} _myid the string specifying the id of this SelectMenu
 * @param {array} _data
 * @param {object} _options the json object describing vis option, for example
 * { width: 200px;
 *   height: 20px;
 *   valueField: 'Name';
 *   labelField: 'prettyPrint',
 *   searchField: 'id'}
 * @param {eventHandler} _eventHandler an event handler generated by d3.dispatch("someEvent")
 */
SelectMenu = function (_parentElement, _myid, _data, _options, _eventHandler) {
    var self = this;
    self.parentElement = _parentElement;
    self.data = _data;
    self.options = _options;
    self.ctrlID = _myid;
    self.eventHandler = _eventHandler;
    self.init();
};

SelectMenu.prototype.init = function () {
    var self = this;
    var smenu = document.createElement("select");
    smenu.setAttribute("id", self.ctrlID);
    self.parentElement.appendChild(smenu);
    
    $("#" + self.ctrlID).selectize({
        create: false,
        maxItems: 2,
        valueField: self.options.valueField,
        labelField: self.options.labelField,
        searchField: self.options.searchField,
        openOnFocus: true,
        closeAfterSelect: true,
        options: self.data, // self.extractOptions(self.options.valueField, self.options.labelField, self.options.searchField),
        // render: {
        //     option: function (item, escape) {
        //         return '<p class="geneSet">' + item[self.options.labelField] + '</p>'
        //     }
        // },
        onChange: function (value) {
            self.eventHandler.call("selectionChanged", self, value);
        }
    });
};

/** -----------------------------
 *      Wrappers of Selectize API
 * ------------------------------
 */

SelectMenu.prototype.clear = function(silent) {
    $("#" + this.ctrlID)[0].selectize.clear(silent);
};

SelectMenu.prototype.setValue = function(value, silent) {
    $("#" + this.ctrlID)[0].selectize.setValue(value, silent);
};