define([
"backbone",
"handlebars",
"d3",
"utils/d3_graphs",
"text!tpl/graph-view.html"],
function(Backbone, Handlebars, d3, d3_graphs, graphTPL){
    'use strict';

    var GraphView = Backbone.View.extend({
        template: graphTPL,
        events: {},

        initialize: function(options){
            var self = this;
            self.data = options.data;
            self.section = options.section;
            self.compiled_template = this.compileTemplate();
            self.render();
        },

        render: function() {
            var self = this;
            self.renderTemplate();
            self.plotGraphs();
            return self;
        },
        renderTemplate: function(){
            var self = this;
            var data = {
                bioxidation : true ? self.section === "bioxidation" : false,
                chemical : true ? self.section === "chemical" : false,
                section: self.section
            };
            self.$el.html(this.compiled_template(data));
            return self;
        },
        plotGraphs: function(){
            var self = this;
            self.ferricGraphs();
            self.cupricGraphs();
            if (self.section === "chemical") {
                self.copperGraphs();
            }
            return self;
        },
        ferricGraphs: function(){
            var self = this;
            var ferrous_obj = d3_graphs();
            ferrous_obj.graph_container("#"+self.section+"-ferrous-out");
            ferrous_obj.add_ferrous_data(self.data);

            var ferric_obj = d3_graphs();
            ferric_obj.graph_container("#"+self.section+"-ferric-out");
            ferric_obj.add_ferric_data(self.data);

            var ferrous_obj_in = d3_graphs();
            ferrous_obj_in.graph_container("#"+self.section+"-ferrous-in");
            ferrous_obj_in.add_ferrous_data_in(self.data);

            var ferric_obj_in = d3_graphs();
            ferric_obj_in.graph_container("#"+self.section+"-ferric-in");
            ferric_obj_in.add_ferric_data_in(self.data);

            return self;
        },
        copperGraphs: function(){
            var self = this;
            var copper_obj = d3_graphs();
            copper_obj.graph_container("#"+self.section+"-copper");
            copper_obj.append_copper(self.data);
            return self;
        },
        cupricGraphs: function(){
            var self = this;
            var cupric_obj = d3_graphs();
            cupric_obj.graph_container("#"+self.section+"-cupric");
            cupric_obj.append_cupric(self.data);
            return self;
        },
        compileTemplate: function() {
            var self = this;
            var tpl;
            tpl = Handlebars.default.compile(self.template);
            return tpl;
        }
    });

    return GraphView;
});
