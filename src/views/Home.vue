<template>
  <main class="home" v-loading="loading">
    <section class="booking pt-25">
      <div class="container">
        <el-alert
          v-if="alert.success !== ''"
          :title="alert.success"
          type="success"
          show-icon
          :closable="true"
        >
        </el-alert>

        <el-alert
          class="mb-20"
          v-if="alert.info !== ''"
          :title="alert.info"
          type="info"
          show-icon
          :closable="true"
        >
        </el-alert>

        <el-alert
          class="mb-20"
          v-if="alert.warning !== ''"
          :title="alert.warning"
          type="warning"
          show-icon
          :closable="true"
        >
        </el-alert>

        <el-alert
          class="mb-20"
          v-if="alert.error !== ''"
          :title="alert.error"
          type="error"
          show-icon
          :closable="true"
        >
        </el-alert>

        <el-form
          @submit.prevent.native
          label-position="top"
          class="form form-center form-theme-primary mt-25 pt-25"
          :model="booking"
          ref="booking"
        >
          <h2 class="mb-10">Онлайн бронирование столиков:</h2>
          <p class="mb-15">
            Пожалуйста, заполните форму и наш менеджер свяжется с вами в
            ближайшее время.
          </p>

          <el-form-item
            prop="name"
            :rules="[
              {
                required: true,
                message: 'Пожалуйста заполните форму',
                trigger: 'blur'
              }
            ]"
          >
            <el-input placeholder="Ф.И.О" v-model="booking.name" type="text" />
          </el-form-item>

          <div class="grid">
            <div class="grid-wrapper">
              <el-form-item
                class="grid-cell grid-col-4 mb-22"
                prop="phone"
                :rules="[
                  {
                    required: true,
                    message: 'Пожалуйста заполните форму',
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  placeholder="Телефон +998"
                  v-model="booking.phone"
                  type="number"
                />
              </el-form-item>

              <el-form-item
                class="grid-cell grid-col-4 mb-22"
                prop="date"
                :rules="[
                  {
                    required: true,
                    message: 'Пожалуйста заполните форму',
                    trigger: 'blur'
                  }
                ]"
              >
                <el-date-picker
                  v-model="booking.date"
                  type="date"
                  placeholder="Укажите день"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                class="grid-cell grid-col-4 mb-22"
                prop="time"
                :rules="[
                  {
                    required: true,
                    message: 'Пожалуйста заполните форму',
                    trigger: 'blur'
                  }
                ]"
              >
                <el-time-picker
                  v-model="booking.time"
                  placeholder="Укажите время"
                >
                </el-time-picker>
              </el-form-item>
            </div>
          </div>

          <div class="more-option" v-if="booking.moreOptions">
            <div class="grid">
              <div class="grid-wrapper">
                <el-form-item class="grid-cell grid-col-4 mb-22" prop="room">
                  <el-select
                    v-model="booking.room.value"
                    placeholder="Выберите зал"
                  >
                    <el-option
                      v-for="item in booking.room.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  class="grid-cell grid-col-8 mb-22"
                  prop="email"
                  :rules="[
                    {
                      type: 'email',
                      message: 'Неверный адрес электронной почты',
                      trigger: ['blur', 'change']
                    }
                  ]"
                >
                  <el-input
                    placeholder="example@mail.com"
                    v-model="booking.email"
                    type="email"
                  />
                </el-form-item>
              </div>
            </div>

            <el-form-item prop="description" class="mb-25">
              <el-input
                placeholder="Описание"
                v-model="booking.description"
                type="textarea"
                :rows="4"
              />
            </el-form-item>
          </div>

          <div class="form-group form-group-right">
            <el-form-item prop="moreOptions" class="mb-0">
              <el-checkbox v-model="booking.moreOptions"
                >Больше опций</el-checkbox
              >
            </el-form-item>

            <el-form-item class="mb-0">
              <el-button @click="bookingForm('booking')" type="primary">
                Забронировать
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </section>
    <section class="booking-list mt-25 pt-25">
      <div class="container">
        <el-table :data="getBookings" style="width: 100%">
          <el-table-column
            prop="name"
            label="Name"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="Phone"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="Email"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="room"
            label="Room"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="Date"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="time"
            label="Time"
            width="80"
          ></el-table-column>
          <el-table-column prop="description" label="Description">
          </el-table-column>
        </el-table>
      </div>
    </section>
  </main>
</template>

<script>
import gql from "graphql-tag";
import BOOKING from "@/graphql/booking.gql";

export default {
  name: "Home",
  data() {
    return {
      booking: {
        name: null,
        phone: null,
        email: null,
        room: {
          options: [
            {
              value: "Option1",
              label: "Просторная терраса"
            },
            {
              value: "Option2",
              label: "Концертное пространство"
            },
            {
              value: "Option3",
              label: "Территория ресторана"
            },
            {
              value: "Option4",
              label: "Гранд зал – зал для торжеств"
            },
            {
              value: "Option5",
              label: "Каминный зал"
            }
          ],
          value: ""
        },
        date: null,
        time: null,
        description: null
      },
      alert: {
        success: "",
        info: "",
        warning: "",
        error: ""
      },
      moreOptions: false,
      loading: false
    };
  },
  apollo: {
    getBookings: {
      query: BOOKING,
      update: data => data.booking
    }
  },
  methods: {
    bookingForm(form) {
      this.$refs[form].validate(valid => {
        if (!valid) {
          this.alert.warning =
            "Проверьте пожалуйста правильно ли заполнили форму.";
          return false;
        } else {
          this.loading = true;

          console.log(" booking => ", this.booking);

          const {
            name,
            phone,
            email,
            room,
            date,
            time,
            description
          } = this.booking;

          this.$apollo
            .mutate({
              // Mutation
              mutation: gql`
                mutation(
                  $name: String!
                  $phone: String!
                  $email: String
                  $room: String
                  $date: String!
                  $time: String!
                  $description: String
                ) {
                  createBooking(
                    name: $name
                    phone: $phone
                    email: $email
                    room: $room
                    date: $date
                    time: $time
                    description: $description
                  ) {
                    _id
                    name
                    phone
                    email
                    room
                    date
                    time
                    description
                    createdAt
                    updatedAt
                  }
                }
              `,
              // Parameters
              variables: {
                name: name,
                phone: phone,
                email: email,
                room: room.value,
                date: date.toISOString(),
                time: time.toISOString(),
                description: description
              }
            })
            .then(() => {
              // Result
              this.alert.success =
                "Спасибо за зоявку, наш менеджер свяжется с вами в ближайшее время";
              this.loading = false;
            })
            .catch(error => {
              // Error
              let errorMessage = "";
              if (error.graphQLErrors[0]) {
                errorMessage = error.graphQLErrors[0].message;
              }
              this.alert.error = errorMessage
                ? errorMessage
                : "Что то пошло не так! Попробуйте еще раз или обратитесь в тех поддержку!";
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
