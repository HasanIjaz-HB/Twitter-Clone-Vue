<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-height full-width">
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
          <q-item class="vuett q-py-md" v-for="vuett in vuetts" :key="vuett.id">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Anonymous</strong>
                <span class="text-grey-7">
                  @Anonymous
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
                <q-btn
                  :color="vuett.liked ? 'red' : 'black'"
                  :icon="vuett.liked ? 'fas fa-heart' : 'far fa-heart'"
                  size="sm"
                  @click="toggleLiked(vuett)"
                  flat
                  round
                />

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
        //   id: 1,
        //   content: "lorem asdddddddddddddddddddddd",
        //   date: 1617570592760,
        //   liked: true
        // },
        // {
        //   id: 2,
        //   content: "lorem xzxzxd",
        //   date: 16175705927213,
        //   liked: false
        // }
      ]
    };
  },
  methods: {
    addNewVuett() {
      let newVuett = {
        content: this.newVuettContent,
        date: Date.now(),
        liked: false
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
      db.collection("vuetts")
        .doc(vuett.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    },
    toggleLiked(vuett) {
      db.collection("vuetts")
        .doc(vuett.id)
        .update({
          liked: !vuett.liked
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
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
          vuettChange.id = change.doc.id;
          if (change.type === "added") {
            console.log("New vuett: ", vuettChange);
            this.vuetts.unshift(vuettChange);
          }
          if (change.type === "modified") {
            console.log("Modified vuett: ", vuettChange);
            let index = this.vuetts.findIndex(
              vuett => vuett.id === vuettChange.id
            );
            Object.assign(this.vuetts[index], vuettChange);
          }
          if (change.type === "removed") {
            console.log("Removed vuett: ", vuettChange);
            let index = this.vuetts.findIndex(
              vuett => vuett.id === vuettChange.id
            );
            this.vuetts.splice(index, 1);
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
