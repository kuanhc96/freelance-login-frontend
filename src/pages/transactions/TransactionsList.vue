<template>
    <section>
        <base-card
            card-title="Transactions"
            @refresh="refresh"
        >
            <ul class="d-flex align-items-center list-group my-3 p-1">
                <router-link
                    to="/transactions/record"
                    class="btn btn-secondary my-2"
                >+ Record New Transaction</router-link>
            </ul>

        </base-card>
    </section>
</template>
<script lang="ts">
</script>
