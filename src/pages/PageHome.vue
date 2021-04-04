<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input bottom-slots v-model="newVuettContent" place-holder="What's happening?" counter maxlength="280" autogrow class="new-vuett">
          <template v-slot:before>
            <q-avatar size="xl">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg">
            </q-avatar>
          </template>
        </q-input>
      </div>

      <div class="col col-shrink">
         <q-btn class="q-mb-lg" unelevated rounded color="primary" label="Vuett" no-caps :disable="!newVuettContent" />
      </div>
    </div>

    <q-separator size="10px" color="grey-2" class="divider" />

    <q-list>

      <q-item-label header></q-item-label>
      <q-item class="q-py-md">
        <q-item-section avatar top>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>Hasan Ijaz</strong>
            <span class="text-grey-7">@hasan_ijaz</span>
            </q-item-label>
          <q-item-label class="vuett-content text-body1">
            Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quas quibusdam ex obcaecati voluptatibus corrupti sequi asperiores maiores aliquid temporibus sunt numquam, deleniti incidunt consequatur id praesentium non delectus itaque sit.
          </q-item-label>

          <div class="row justify-between q-mt-sm vuett-icons">
            <q-btn
              color="black"
              icon="far fa-comment"
              size="sm"
              flat
              round
            />
            <q-btn
              color="black"
              icon="fas fa-retweet"
              size="sm"
              flat
              round
            />
            <q-btn
              color="black"
              icon="far fa-heart"
              size="sm"
              flat
              round
            />
            <q-btn
              color="black"
              icon="fas fa-trash"
              size="sm"
              flat
              round
            />
          </div>
        </q-item-section>
        <q-item-section side top>
          1 min ago
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'PageHome',
  data() {
    return {
      newVuettContent: ""
    }

  }
}
</script>
<style lang="sass">
.new-vuett
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.vuett-content
  white-space: pre-line
.vuett-icons
  margin-left: -5px
</style>