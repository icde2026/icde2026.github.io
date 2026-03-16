    async function loadICDEFeed() {
      const handle = 'icde-publicity.bsky.social';
      const limit = 12;
      const feedContainer = document.getElementById('feed');

      try {
        const response = await fetch(
          `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${handle}&limit=${limit}&filter=posts_no_replies`
        );

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        feedContainer.innerHTML = '';

        if (!data.feed || data.feed.length === 0) {
          feedContainer.innerHTML = '<p class="error">No recent posts found.</p>';
          return;
        }

        data.feed.forEach(item => {
          const post = item.post;
          const uri = post.uri;

          const blockquote = document.createElement('blockquote');
          blockquote.className = 'bluesky-embed';
          blockquote.setAttribute('data-bluesky-uri', uri);
          blockquote.innerHTML = `<p>Loading...</p>`;

          feedContainer.appendChild(blockquote);
        });

        if (!document.querySelector('script[src*="embed.bsky.app"]')) {
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://embed.bsky.app/static/embed.js';
          document.body.appendChild(script);
        }

      } catch (err) {
        console.error('Feed load error:', err);
        feedContainer.innerHTML = `<p class="error">Error loading posts.<br><a href="https://bsky.app/profile/icde-publicity.bsky.social">View on Bluesky</a></p>`;
      }
    }

    window.addEventListener('load', loadICDEFeed);