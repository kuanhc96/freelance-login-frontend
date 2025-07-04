<template>
    <section>
        <BaseCard card-title="Reset Password">
            <form>
                <div class="mb-3">
                    <label class="form-label" for="new-password">New Password</label>
                    <input class="form-control" type="password" id="new-password" required/>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="retype-password">Retype Password</label>
                    <input class="form-control" type="password" id="retype-password" required/>
                </div>
                <div class="mb-3">
                    <button class="btn btn-secondary" type="submit">Reset Password</button>
                </div>
            </form>
            <div>
                <router-link class="btn btn-primary" to="/login">Login</router-link>
            </div>
        </BaseCard>
    </section>
</template>

<script>
import BaseCard from '../../components/ui/BaseCard.vue';

export default {
    components: {
        BaseCard
    }
}
</script>
