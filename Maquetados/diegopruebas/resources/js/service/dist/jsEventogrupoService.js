function eventogrupoService(){var o=new jsConnector;this.addEventogrupo=function(e,t){try{o.post(url.eventogrupo.add,JSON.stringify(e),function(e){null!=e?(successMessage({title:message.eventogrupo.add.title,content:message.eventogrupo.add.success}),t(e)):errorMessage({title:message.eventogrupo.add.title,content:message.eventogrupo.add.error})})}catch(e){console.log(e)}},this.updateEventogrupo=function(e,t){try{o.post(url.eventogrupo.update,e,function(e){null!=e&&1===e?(successMessage({title:message.eventogrupo.update.title,content:message.eventogrupo.update.success}),t(e)):errorMessage({title:message.eventogrupo.update.title,content:message.eventogrupo.update.error})})}catch(e){console.log(e)}},this.deleteEventogrupo=function(e,t){try{o.post(url.eventogrupo.delete,e,function(e){null!=e&&1===e?(successMessage({title:message.eventogrupo.delete.title,content:message.eventogrupo.delete.success}),t(e)):errorMessage({title:message.eventogrupo.delete.title,content:message.eventogrupo.delete.error})})}catch(e){console.log(e)}},this.getInfoEventogrupo=function(e,t){try{o.post(url.eventogrupo.info,JSON.stringify(e),function(e){t(e)})}catch(e){console.log(e)}}}