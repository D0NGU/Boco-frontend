<template>
  <div id="wideScreen">
    <v-card  class="mx-auto my-12 rounded-l itemCard"
             max-width="280">
      <v-rating length="5" readonly size="35" v-model="rating"></v-rating>
      <v-divider/>

      <div class="itemContainer">
        <p class="text-subtitle-1 box">{{ comment }} </p>
        <!--<p class="text-caption" >{{itemPrice}} kr/dag</p>-->

        <!-- TODO HVIS DU ER EIER, FÅ EDIT KNAPPER I STEDET -->
        <p class="text-overline itemOwner">
          <v-avatar size="x-small">
            <v-img src="../../assets/images/missing_profile_img.png" alt="profile picture"></v-img>
          </v-avatar> {{author}} </p>
      </div>

    </v-card>
  </div>

  <div id="mobile">
    <v-card class="rounded-l itemCard">
      <div class="itemContainer">
        <div class="rating">
          <v-icon size="x-large">mdi-star</v-icon>
          <p class="starsAmount"> {{ rating }} av 5 </p>
        </div>
        <v-divider vertical />
        <div class="itemDetail">
          <p class="text-subtitle-1 box">{{ comment }} </p>
          <!--<p class="text-caption" >{{itemPrice}} kr/dag</p>-->

          <!-- TODO HVIS DU ER EIER, FÅ EDIT KNAPPER I STEDET -->
          <p class="text-overline itemOwner">
            <v-avatar size="x-small">
              <v-img src="../../assets/images/missing_profile_img.png" alt="profile picture"></v-img>
            </v-avatar> {{author}} </p>

        </div>
      </div>
    </v-card>
  </div>

</template>


<script>
import UserAccountService from "@/service/UserAccountService";

export default {
  name: "ReviewCard",
  props: {
    rating: Number,
    comment: String,
    authorId: Number,
  },
  data (){
    return {
      author: '',
    }
  },
  async beforeMount() {
    const userInfo = (await UserAccountService.getUser(this.authorId)).data
    this.author = userInfo.fname + " " + userInfo.lname
  }
}
</script>

<style scoped>
.itemCard {
  margin: 20px;
  background-color: white;
  padding: 10px;
}

.itemContainer {
  height: 150px;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.box {
  height: 90px;
  inline-size: 220px;
  overflow-wrap: break-word;
  hyphens: manual;
  overflow: scroll;
}

.rating {
  margin: 10px;
}
.itemDetail {
  height: 100%;
  margin: 10px 0 10px 20px;
  text-align: left;
  position: relative;
  z-index: 1;
  flex-grow: 1;
}
.itemOwner {
  position: absolute;
  bottom: 0;
  padding: 10px;
}
.starsAmount {
  width: 45px;
}

@media screen and (min-width: 600px) {
  #mobile {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  #wideScreen {
    display: none;
  }
  .itemCard {
    max-width: 450px;
    margin: 10px auto;
    background-color: white;
  }
  .itemContainer {
    align-content: center;
    height: 115px;
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }
  .itemOwner {
    position: absolute;
    bottom: 0;
    padding: 0px;
  }
  .rating {
    margin-left: 5px;
  }

  .box {
    inline-size: 200px;
    overflow-wrap: break-word;
    hyphens: manual;
    height: 80px;
  }
}
</style>
