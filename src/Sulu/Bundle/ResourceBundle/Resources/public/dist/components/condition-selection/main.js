define([],function(){"use strict";var a=0,b=1,c=2,d=3,e=4,f={operatorsUrl:null,fieldsUrl:null,eventNamespace:"sulu.condition-selection",dataAttribute:"condition-selection",instanceName:"condition",translations:{addButton:"resource.filter.add-condition"},data:[],validationSelector:null},g={string:b,number:c,integer:c,"float":c,"boolean":e,date:d,datetime:d},h={container:function(a,b){return['<div class="',a,'" id="',b,'" style="display:none"></div>'].join("")},button:function(a,b){return['<div class="grid-row">','   <div class="grid-col-3">','       <div id="',a,'" class="btn action">','           <span class="fa-plus-circle"></span>','           <span class="text">',b,"</span>","       </div>","   </div>","</div>"].join("")},row:function(a,b){return['<div class="',a,' grid-row" data-id="',b,'"></div>'].join("")},removeButton:function(a){return['<div class="grid-col-1 align-center pointer ',a,'">','<span class="fa-minus-circle m-top-7"></span>',"</div>"].join("")},input:function(a,b){return['<input data-validation-required="true" class="form-element husky-validate ',b,'" type="text" value="',a,'">'].join("")},col:function(a){return['<div class="',a,'"></div>'].join("")},select:function(a){return['<select data-validation-required="true" class="form-element husky-validate ',a,'"></select>'].join("")}},i={valueInputClass:"value-input",conditionContainerClass:"conditions-container",conditionRowClass:"condition-row",operatorSelectClass:"operator-select",fieldSelectClass:"field-select",removeButtonClass:"condition-remove"},j=function(){return m.call(this,"initialized")},k=function(){return"data-changed"},l=function(){return m.call(this,"data-changed")},m=function(a){return this.options.eventNamespace+"."+(this.options.instanceName?this.options.instanceName+".":"")+a},n=function(){var a=this.sandbox.dom.createElement('<div id="'+this.options.ids.loader+'"></div>');this.sandbox.dom.append(this.options.el,a),this.sandbox.start([{name:"loader@husky",options:{el:a,size:"100px",color:"#cccccc"}}])},o=function(){this.sandbox.stop("#"+this.options.ids.loader)},p=function(){this.options.data&&this.options.data.length>0&&this.options.data.forEach(function(a){q.call(this,a)}.bind(this))},q=function(a){var b,c,d,e,f,g,j={},k=[],l=a?a.id:"new";b=this.sandbox.dom.createElement(h.row(i.conditionRowClass,l)),c=this.sandbox.dom.createElement(h.removeButton(i.removeButtonClass)),a?(j=a.conditions[0],k=D.call(this,j.type),d=w.call(this,j.field,!1,!0)):d=w.call(this,j.field,!0,!0),f=z.call(this,j.operator,j.type),e=r.call(this,f,k,!1,!0),g=x.call(this,a,f,"grid-col-4",!0),this.sandbox.dom.append(b,c),this.sandbox.dom.append(b,d),this.sandbox.dom.append(b,e),this.sandbox.dom.append(b,g),this.sandbox.dom.append(this.$container,b)},r=function(a,b,c,d){var e,f=G.call(this,a?a.id:null,"id","name",b,i.operatorSelectClass,c);return a&&this.sandbox.dom.data(f,"type",a.type),d?(e=this.sandbox.dom.createElement(h.col("grid-col-3")),this.sandbox.dom.append(e,f),e):f},s=function(a){var b;a&&(this.usedFields[a]?(b=this.usedFields[a],delete this.usedFields[a],this.fields[a]=b):this.sandbox.logger.error("Field "+a+" could not be found in used fields!"))},t=function(a){var b;this.fields[a]?(b=this.fields[a],delete this.fields[a],this.usedFields[a]=b):this.sandbox.logger.error("Field "+a+" could not be found in fields!")},u=function(a){var b=this.sandbox.dom.find("."+i.fieldSelectClass,this.$el);this.sandbox.util.foreach(b,function(b){b!==a&&v.call(this,b)}.bind(this))},v=function(a){var b,c=this.sandbox.dom.find("option",a),d=this.sandbox.dom.val(a),e=!1;this.sandbox.dom.val(c[0])||(e=!0),this.sandbox.dom.remove(c),c=H.call(this,d,"name","translation",this.fields,e),d&&(this.fields[d]||(b=this.sandbox.translate(this.usedFields[d].translation),c.push('<option value="'+this.usedFields[d].name+'" selected>'+b+"</option>")),this.sandbox.dom.append(a,c.join("")))},w=function(a,b,c){var d,e=G.call(this,a,"name","translation",this.fields,i.fieldSelectClass,b);return a&&(t.call(this,a),u.call(this,e[0]),this.sandbox.dom.data(e,"value",a)),c?(d=this.sandbox.dom.createElement(h.col("grid-col-4")),this.sandbox.dom.append(d,e),d):e},x=function(a,b,c,d){var e,f,g,j=null;return a&&b?a.conditions.length>1?this.sandbox.logger.error("Multiple conditions not yet supported!"):(f=a.conditions[0],j=A.call(this,b,f.value),g=f.id):j=!a&&b?A.call(this,b,""):C.call(this,"",i.valueInputClass),this.options.validationSelector&&this.sandbox.form.addField(this.options.validationSelector,j),this.sandbox.dom.data(j,"id",g),d?(e=this.sandbox.dom.createElement(h.col(c)),this.sandbox.dom.append(e,j),e):j},y=function(a){var b=null;return a=parseInt(a),this.operators.forEach(function(c){return c.id===a?(b=c,!1):void 0}.bind(this)),b},z=function(a,b){var c=null;return"string"==typeof b&&(b=F.call(this,b)),this.operators.forEach(function(d){return d.operator===a&&d.type===b?(c=d,!1):void 0}.bind(this)),c},A=function(a,b){switch(a.inputType){case"date":case"datepicker":return B.call(this,b,i.valueInputClass);case"select":case"boolean":case"radio":case"checkbox":return G.call(this,b,"value","name",a.values,i.valueInputClass,!0);case"":case"simple":return C.call(this,b,i.valueInputClass);default:this.sandbox.logger.error('Input type "'+type+'" is not supported!')}},B=function(a,b){var c,d=this.sandbox.dom.createElement('<div data-value="'+a+'" class="'+b+'"></div>'),e=this.sandbox.data.deferred();return this.deferreds.push(e),c="cs-datepicker"+this.deferreds.length,this.sandbox.start([{name:"input@husky",options:{el:d,datepickerOptions:{endDate:new Date},skin:"date",value:a,instanceName:c}}]),this.sandbox.on("husky.input."+c+".initialized",function(){e.resolve()}.bind(this)),d},C=function(a,b){return this.sandbox.dom.createElement(h.input(a,b))},D=function(b){var c=[];return b="string"==typeof b?F.call(this,b):b||a,this.operators.forEach(function(a){a.type===b&&c.push(a)}.bind(this)),c},E=function(a){return g.hasOwnProperty(a)?!0:!1},F=function(a){return E(a)?g[a]:(this.sandbox.logger.error('Unsupported type "'+a+'" found!'),null)},G=function(a,b,c,d,e,f){var g=H.call(this,a,b,c,d,f),i=this.sandbox.dom.createElement(h.select.call(this,e));return this.options.validationSelector&&this.sandbox.form.addField(this.options.validationSelector,i),this.sandbox.dom.append(i,g.join("")),i},H=function(a,b,c,d,e){var f,g,h=[];e&&h.push('<option value=""></option>');for(f in d)d.hasOwnProperty(f)&&(g=this.sandbox.translate(d[f][c]),d[f][b]===a?h.push('<option value="'+d[f][b]+'" selected>'+g+"</option>"):h.push('<option value="'+d[f][b]+'">'+g+"</option>"));return h},I=function(){var a=this.sandbox.translate(this.options.translations.addButton),b=this.sandbox.dom.createElement(h.button.call(this,this.options.ids.addButton,a));this.sandbox.dom.append(this.options.el,b)},J=function(){this.sandbox.dom.on(this.options.el,"click",R.bind(this),"#"+this.options.ids.addButton),this.sandbox.dom.on(this.$container,"click",S.bind(this),"."+i.removeButtonClass),this.sandbox.dom.on(this.$container,"change",Q.bind(this),"."+i.fieldSelectClass),this.sandbox.dom.on(this.$container,"change",P.bind(this),"."+i.operatorSelectClass),this.sandbox.dom.on(this.$el,k.call(this),N.bind(this)),this.sandbox.dom.on(this.$container,"change",function(){W.call(this)}.bind(this),"select, input"),this.sandbox.dom.on(this.$container,"change",function(a){L.call(this,a)}.bind(this),"select."+i.operatorSelectClass),this.sandbox.dom.on(this.$container,"change",K.bind(this),"select."+i.fieldSelectClass)},K=function(a){var b=this.sandbox.dom.createElement(a.currentTarget),c=this.sandbox.dom.data(b,"value"),d=this.sandbox.dom.val(b);c&&s.call(this,c),d&&(t.call(this,d),u.call(this,b[0]),this.sandbox.dom.data(b,"value",d))},L=function(a){var b=a.currentTarget,c=this.sandbox.dom.val(b),d=y.call(this,c);this.sandbox.dom.data(b,"type",d.type)},M=function(){for(var a in this.usedFields)this.fields[a]=this.usedFields[a];this.usedFields={}},N=function(){var a=this.sandbox.dom.data(this.options.el,"condition-selection");M.call(this),O.call(this,a),W.call(this)},O=function(a){var b=this.sandbox.dom.find("."+i.conditionRowClass,this.$container);this.sandbox.dom.each(b,function(a,b){T.call(this,b)}.bind(this)),this.options.data=a,p.call(this)},P=function(a){var b=a.target.value,c=this.sandbox.dom.closest(a.target,"."+i.conditionRowClass),d=y.call(this,b),e=this.sandbox.dom.find("."+i.valueInputClass,c)[0],f=this.sandbox.dom.parent(e);this.options.validationSelector&&this.sandbox.form.removeField(this.options.validationSelector,e),this.sandbox.stop(e),this.sandbox.dom.remove(e),e=x.call(this,null,d,null,!1),this.sandbox.dom.append(f,e)},Q=function(a){var b=a.target.value,c=this.fields[b],d=D.call(this,c.type),e=this.sandbox.dom.closest(a.target,"."+i.conditionRowClass),f=this.sandbox.dom.find("."+i.operatorSelectClass,e)[0],g=this.sandbox.dom.find("."+i.valueInputClass,e)[0],h=this.sandbox.dom.parent(f),j=this.sandbox.dom.parent(g);this.options.validationSelector&&(this.sandbox.form.removeField(this.options.validationSelector,g),this.sandbox.form.removeField(this.options.validationSelector,f)),this.sandbox.dom.remove(f),this.sandbox.stop(g),this.sandbox.dom.remove(g),f=r.call(this,null,d,!0,!1),g=x.call(this),this.sandbox.dom.append(h,f),this.sandbox.dom.append(j,g)},R=function(){q.call(this),this.sandbox.emit(l.call(this))},S=function(a){var b=this.sandbox.dom.closest(a.currentTarget,"."+i.conditionRowClass),c=this.sandbox.dom.find("."+i.fieldSelectClass,b),d=this.sandbox.dom.data(c,"value");s.call(this,d),u.call(this,c),T.call(this,b)},T=function(a){var b=(this.sandbox.dom.data(a,"id"),this.sandbox.dom.find("."+i.fieldSelectClass,a)),c=this.sandbox.dom.find("."+i.operatorSelectClass,a),d=this.sandbox.dom.find("."+i.valueInputClass,a);this.options.validationSelector&&(this.sandbox.form.removeField(this.options.validationSelector,b),this.sandbox.form.removeField(this.options.validationSelector,c),this.sandbox.form.removeField(this.options.validationSelector,d)),this.sandbox.dom.remove(a),W.call(this)},U=function(a){var b,c,d,e,f,g,h,j={conditions:[]},k=this.sandbox.dom.data(a,"id");return k&&"new"!==k&&(j.id=k),b=this.sandbox.dom.val(this.sandbox.dom.find("."+i.fieldSelectClass,a)),d=this.sandbox.dom.data(this.sandbox.dom.find("."+i.operatorSelectClass,a),"type"),c=this.sandbox.dom.val(this.sandbox.dom.find("."+i.operatorSelectClass,a)),f=this.sandbox.dom.data(this.sandbox.dom.find("."+i.valueInputClass,a),"id"),h=y.call(this,c),e=h&&"datepicker"===h.inputType?this.sandbox.dom.val(this.sandbox.dom.find("."+i.valueInputClass+" input",a)):this.sandbox.dom.val(this.sandbox.dom.find("."+i.valueInputClass,a)),g={type:d,field:b,operator:h?h.operator:null,value:e},f&&(g.id=f),j.conditions.push(g),j},V=function(){var a=[],b=this.sandbox.dom.find("."+i.conditionRowClass,this.$container);return this.sandbox.dom.each(b,function(b,c){a.push(U.call(this,c))}.bind(this)),a},W=function(){this.data=V.call(this),this.sandbox.dom.data(this.options.el,"conditionSelection",this.data),this.sandbox.emit(l.call(this))},X=function(a){var b={};return a.forEach(function(a){E(a.type)&&(b[a.name]=a)}.bind(this)),b};return{initialize:function(){this.options=this.sandbox.util.extend(!0,{},f,this.options),this.options.ids={loader:"condition-selection-"+this.options.instanceName+"-loader",container:"condition-selection-"+this.options.instanceName+"-container",addButton:"condition-selection-"+this.options.instanceName+"-add-button"},n.call(this),this.fetchOperatorsAndFields()},fetchOperatorsAndFields:function(){var a,b;this.options.operatorsUrl&&"string"==typeof this.options.operatorsUrl&&this.options.fieldsUrl&&"string"==typeof this.options.fieldsUrl?(a=this.sandbox.util.load(this.options.operatorsUrl),b=this.sandbox.util.load(this.options.fieldsUrl),this.sandbox.data.when(a,b).done(function(a,b){this.operators=a[0]._embedded.items,this.fields=X.call(this,b[0]),this.render()}.bind(this))):this.sandbox.logger.error("Url for fields and/or operators not specified or invalid!")},render:function(){this.usedFields={},this.deferreds=[],this.$container=this.sandbox.dom.createElement(h.container(i.conditionContainerClass,this.options.ids.container)),this.sandbox.dom.append(this.options.el,this.$container),this.options.data&&p.call(this),I.call(this),o.call(this),this.sandbox.dom.show(this.$container),this.deferreds?this.sandbox.data.when.apply(this,this.deferreds).then(function(){J.call(this)}.bind(this)):J.call(this),this.sandbox.emit(j.call(this))}}});