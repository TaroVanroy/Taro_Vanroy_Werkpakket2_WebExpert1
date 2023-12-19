<script>

export default {
  data() {
    return {
      gegevens: {
        "Straat": "Elfde-Liniestraat 24",
        "Nummer": "011 77 55 55",
        "Website": "digital@pxl.be"
      },

    }
  },
  components: {

  }
}
</script>

<template>
<div id="footer">
  <p>{{ gegevens.Straat }}</p>
  <p>{{ gegevens.Nummer }}</p>
  <p>{{ gegevens.Website }}</p>
</div>
</template>

<style>

#footer
{
  width: 100%;
  height: 200px;
  background: rgb(188,91,237);
  background: linear-gradient(270deg, rgba(188,91,237,1) 0%, rgba(112,141,255,1) 100%, rgba(2,0,36,1) 202124%);
  margin-top: 8rem;
  padding-top: 20px;
}

#footer p
{
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 18px;
  padding-top: 25px;
  color: #fff
}

</style>