<?php get_header(); ?>

<!--?php get_template_part( 'content', get_post_format() ); ?-->
<section class="order">
    <div class="order__main-area" v-bind:class="shrinkBox()">
        <div class="order__options">
            <h2 class="order__heading">Order Your Hot Drink:</h2>
            <input type="text" class="fname order__input form-control" placeholder="First Name" v-model="name">
            <select name="hot-drink-type" id="type" class="order__input form-control" v-model="type">
                <option v-for="type in types" v-bind:value="type.name">{{ type.name }}</option>
            </select>
            <select v-if="type == 'Hot Chocolate'" name="chocolate-flavour" id="type" class="order__input form-control" v-model="chocolate">
                <option v-for="chocolate in chocolates" v-bind:value="chocolate.name">{{ chocolate.name }}</option>
            </select>
            <select v-if="type != 'Green Tea'" name="milk" id="type" class="order__input form-control" v-model="milk">
                <option v-for="milk in milks" v-bind:value="milk.option">{{ milk.option }}</option>
            </select>
            <input type="number" min=0 max=4 class="sugar order__input form-control" placeholder="How many sugars?" v-model="sugar">
        </div>
    </div>
    <div class="order__sidebar" v-bind:class="exposeOrder()">
        <aside class="order__current-order">
            <h4 class="order__heading"><span class="order__fname">{{ name }}</span><span v-if="name">'s </span></span>Current Order:</h4>
            <ul v-if="type">
                <li v-if="type">
                    {{ type }} <span v-if="chocolate">- {{ chocolate }}</span> <span v-if="type != 'Green Tea'">{{ milk }}</span>
                </li>
                <li v-if="type != 'Green Tea'">
                    <span v-if="sugar == 0">No Sugar</span>
                    <span v-else>{{ sugar }}<span> Sugar<span v-if="sugar > 1">s</span>
                </li>
            </ul>
        </aside>
    </div>
</section>

<?php get_footer(); ?>
