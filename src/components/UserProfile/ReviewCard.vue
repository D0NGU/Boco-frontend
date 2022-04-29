<template>
  <v-card class="rounded-xl itemCard">
    <div class="itemContainer">
      <div id="rating">
      <v-icon size="x-large">mdi-star</v-icon>
      <p id="starsAmount"> {{ rating }} av 5 </p>
      </div>
      <v-divider vertical="" />
      <div class="itemDetail">
        <p class="text-subtitle-1">{{ ratingComment }} </p>
        <!--<p class="text-caption" >{{itemPrice}} kr/dag</p>-->


        <!-- TODO HVIS DU ER EIER, FÅ EDIT KNAPPER I STEDET -->
        <p class="text-overline" id="itemOwner">
          <v-avatar size="x-small">
            <v-img src="https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png" alt="profile picture"></v-img>
          </v-avatar> {{author}} </p>

      </div>
    </div>
  </v-card>
</template>


<script>
import UserAccountService from "@/service/UserAccountService";

export default {
  name: "ReviewCard",
  props: {
    rating: Number,
    ratingComment: String,
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
}
.itemContainer {
  height: 120px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
#rating {
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
#itemOwner {
  position: absolute;
  bottom: 0;
}
#starsAmount {
  width: 45px;
}
</style>