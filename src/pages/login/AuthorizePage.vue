<template>
    <div class="mt-7">
        <button @click="startOAuth">Login with Auth Server</button>
    </div>
</template>

<script>
export default {
    methods: {
        startOAuth() {
            const authorizeUrl = new URL('http://localhost:9000/oauth2/authorize');

            // Set query parameters
            authorizeUrl.searchParams.append('client_id', 'fe-client');
            authorizeUrl.searchParams.append('redirect_uri', 'http://localhost:8080/callback'); // your app's callback endpoint
            authorizeUrl.searchParams.append('response_type', 'code'); // for authorization code flow
            authorizeUrl.searchParams.append('scope', 'openid'); // scopes
            authorizeUrl.searchParams.append('state', 'abcde'); // state

            // Redirect user to the authorize URL
            window.location.href = authorizeUrl.toString();
        }
    }
}
</script>
