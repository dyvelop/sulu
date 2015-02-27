define(function(){"use strict";var a={data:{},instanceName:"collection"},b={settingsFormId:"collection-settings"};return{view:!0,layout:{navigation:{collapsed:!0},content:{width:"fixed"}},templates:["/admin/media/template/collection/settings"],initialize:function(){this.options=this.sandbox.util.extend(!0,{},a,this.options),this.saved=!0;var b="/admin/api/collections/"+this.options.data.id+"?depth=1";this.sandbox.emit("husky.navigation.select-id","collections-edit",{dataNavigation:{url:b}}),this.bindCustomEvents(),this.render()},bindCustomEvents:function(){this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.media.collections.list")}.bind(this)),this.sandbox.on("sulu.header.toolbar.language-changed",this.changeLanguage.bind(this)),this.sandbox.on("sulu.header.toolbar.save",this.save.bind(this))},changeLanguage:function(a){this.sandbox.emit("sulu.header.toolbar.item.loading","language"),this.sandbox.emit("sulu.media.collections.reload-collection",this.options.data.id,{locale:a.id,breadcrumb:"true"},function(a){this.options.data=a,this.sandbox.form.setData("#"+b.settingsFormId,this.options.data),this.setHeaderInfos(),this.sandbox.emit("sulu.header.toolbar.item.enable","language",!1)}.bind(this)),this.sandbox.emit("sulu.media.collections-edit.set-locale",a.id)},render:function(){this.setHeaderInfos(),this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/media/template/collection/settings")),this.sandbox.start("#"+b.settingsFormId),this.sandbox.form.create("#"+b.settingsFormId),this.sandbox.form.setData("#"+b.settingsFormId,this.options.data).then(function(){this.bindDomEvents()}.bind(this))},bindDomEvents:function(){this.sandbox.dom.on("#"+b.settingsFormId,"change keyup",function(){this.saved===!0&&(this.sandbox.emit("sulu.header.toolbar.state.change","edit",!1),this.saved=!1)}.bind(this))},setHeaderInfos:function(){var a,b,c=[{title:"navigation.media"},{title:"media.collections.title"}],d=this.options.data._embedded.breadcrumb||[];for(a=0,b=d.length;b>a;a++)c.push({title:d[a].title,event:"sulu.media.collections.breadcrumb-navigate",eventArgs:d[a]});c.push({title:this.options.data.title}),this.sandbox.emit("sulu.header.set-title",this.options.data.title),this.sandbox.emit("sulu.header.set-breadcrumb",c)},save:function(){if(this.sandbox.form.validate("#"+b.settingsFormId)){var a=this.sandbox.form.getData("#"+b.settingsFormId);this.options.data=this.sandbox.util.extend(!0,{},this.options.data,a),this.sandbox.emit("sulu.header.toolbar.item.loading","save-button"),this.sandbox.once("sulu.media.collections.collection-changed",this.savedCallback.bind(this)),this.sandbox.emit("sulu.media.collections.save-collection",this.options.data)}},savedCallback:function(){this.setHeaderInfos(),this.sandbox.emit("sulu.header.toolbar.state.change","edit",!0,!0),this.saved=!0,this.sandbox.emit("sulu.labels.success.show","labels.success.collection-save-desc","labels.success"),this.sandbox.emit("husky.data-navigation.collections.reload")}}});