<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            bottom-slots
            v-model="newVuettContent"
            place-holder="What's happening?"
            counter
            maxlength="280"
            autogrow
            class="new-vuett"
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </template>
          </q-input>
        </div>

        <div class="col col-shrink">
          <q-btn
            @click="addNewVuett"
            class="q-mb-lg"
            unelevated
            rounded
            color="primary"
            label="Vuett"
            no-caps
            :disable="!newVuettContent"
          />
        </div>
      </div>

      <q-separator size="10px" color="grey-2" class="divider" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item
            class="vuett q-py-md"
            v-for="vuett in vuetts"
            :key="vuett.date"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Hasan Ijaz</strong>
                <span class="text-grey-7">
                  @hasan_ijaz
                  <br class="lt-md" />&bull; {{ vuett.date | relativeDate }}
                </span>
              </q-item-label>
              <q-item-label class="vuett-content text-body1">
                {{ vuett.content }}
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
                <q-btn color="black" icon="far fa-heart" size="sm" flat round />
                <q-btn
                  @click="deleteVuett(vuett)"
                  color="black"
                  icon="fas fa-trash"
                  size="sm"
                  flat
                  round
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { formatDistance } from "date-fns";
import db from "src/boot/firebase";

export default {
  name: "PageHome",
  data() {
    return {
      newVuettContent: "",
      vuetts: [
        // {
        //   content: "lorem asdddddddddddddddddddddd",
        //   date: 1617570592760
        // },
        // {
        //   content: "lorem asdddddddddddddddddddddd",
        //   date: 16175705927213
        // },
        // {
        //   content: "lorem asdddddddddddddddddddddd",
        //   date: 16175705927123
        // }
      ]
    };
  },
  methods: {
    addNewVuett() {
      let newVuett = {
        content: this.newVuettContent,
        date: Date.now()
      };
      db.collection("vuetts")
        .add(newVuett)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
      this.newVuettContent = "";
    },
    deleteVuett(vuett) {
      let dateToDelete = vuett.date;
      let index = this.vuetts.findIndex(vuett => vuett.date === dateToDelete);
      this.vuetts.splice(index, 1);
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    }
  },
  mounted() {
    db.collection("vuetts")
      .orderBy("date")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let vuettChange = change.doc.data();
          if (change.type === "added") {
            console.log("New vuett: ", vuettChange);
            this.vuetts.unshift(vuettChange);
          }
          if (change.type === "modified") {
            console.log("Modified vuett: ", vuettChange);
          }
          if (change.type === "removed") {
            console.log("Removed vuett: ", vuettChange);
          }
        });
      });
  }
};
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
.vuett:not(:first-child)
  border-top: 1px solid rgba(0,0,0,0.12)
</style>
