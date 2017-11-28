<template>
  <table>
    <thead class="daynames">
      <tr>
        <th>Sun</th>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='week in weeks'>
        <td v-for='day in week' :class='{active: day.day < 26}'>
          <div class='date'>{{day.day}}</div>
          <div v-if='getArticle(day) && !day.editing'>
            <img :src='getArticle(day).profileImageURL' class="pull-left" width='16' height='16'>
            {{getArticle(day).username}}
            <br>
            <a v-if='getArticle(day).url' :href="getArticle(day).url">{{getArticle(day).title}}</a>
            <span v-if='!getArticle(day).url'>{{getArticle(day).title}}</span>
            <a href="#" class="glyphicon glyphicon-edit" aria-hidden="true"
              v-if='isEditabled(day)' v-on:click.prevent='editMode(day)'></a>
            <a href="#" class="glyphicon glyphicon-remove"
              aria-hidden="true" v-if='isEditabled(day)'
              v-on:click.prevent="removeArticle(day)"></a>
          </div>
          <form id="form" v-if='day.editing'>
            <div class="form-group">
              <input class="form-control" v-model="getArticle(day).title"
              placeholder="제목">
              <input class="form-control" v-model="getArticle(day).url"
              placeholder="URL">
              <button class="btn" v-on:click='editArticle(day)'>
                고치기
              </button>
            </div>
          </form>

          <div class="form-group">
            <button class="btn" v-if='newArticle && newArticle.username && isEnabled(day)'
              v-on:click='setDay(day)' data-toggle="modal"
              data-target="#newArticle">예약</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const weeks = [
  [26, 27, 28, 29, 30,  1,  2],
  [ 3,  4,  5,  6,  7,  8,  9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30]
]
export default {
  name: 'Calendar',
  data () {
    return {
      articles: [
        {
          day: 1,
          username: 'sample-guy',
          profileImageURL: 'sample-image',
          title: 'awsome article',
          url: 'http://google.com',
        },
        {
          day: 2,
          username: 'sample-guy',
          profileImageURL: 'sample-image',
          title: 'awsome article',
          url: '',
        },
      ],
      weeks: weeks.map(week => week.map(day => ({ day: day, editing: false }))),
    }
  },

  methods: {
    addArticle() {
      if (this.isValid) {
        this.articles.push(this.newArticle)
      }
    },
    getArticle(day) {
      return this.articles.find((article) => article.day === day.day)
    },
    isEnabled(day) {
      return day.day < 26 && !this.getArticle(day)
    },
    setDay(day) {
      this.newArticle.day = day.day
    },
    isEditabled(day) {
      const article = this.getArticle(day)
      return article && this.newArticle && this.newArticle.username === article.username
    },
    editMode(day) {
      day.editing = true
    },
    editArticle(day) {
      const article = this.getArticle(day)
      new Firebase(`${baseURL}${year}/articles/${article.id}`)
        .update(article)
      day.editing = false
    },
    removeArticle(day) {
      const article = this.getArticle(day)
      new Firebase(`${baseURL}${year}/articles/${article.id}`).remove()
    },
    login() {
      const ref = new Firebase(baseURL)
      ref.authWithOAuthPopup("github", (error, authData) => {
        if (!error) {
          localStorage.setItem("username", authData.github.username)
          localStorage.setItem("profileImageURL", authData.github.profileImageURL)
          this.newArticle.username = authData.github.username
          this.newArticle.profileImageURL = authData.github.profileImageURL
        }
      })
    },
    logout: function () {
      localStorage.setItem("username", "")
      localStorage.setItem("profileImageURL", "")
      location.reload(true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width:100%;
  border-color: #910002;
}

th {
  width:14.3%;
  color: #FFFFFF;
  background-color: #910002;
  border-color: #910002;
}

td {
  color: #910002;
  border-color: #910002;
  background-color: #910002;
  padding: 0;
  height: 200px;
}

td.active {
  color: #000000;
  background-color: #FFFFFF;
}

td.active div {
  padding: 8px;
}
td.active input {
  margin-bottom: 4px;
}

td.active img {
  margin-right: 8px;
  border-radius: 10px;
}

td.active .date {
  color: #FFFFFF;
  border-color: #910002;
  background: #BC0003;
  padding: 4px 8px;
}

td button {
  width: 100%;
}
.daynames {
  font-size: 20px;
  line-height: 18px;
}
</style>
