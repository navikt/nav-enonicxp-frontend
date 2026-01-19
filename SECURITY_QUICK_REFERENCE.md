# Quick Security Reference

## 🚨 Quick Response to Injection Attacks

Your application now has **5 layers of defense** against injection attacks:

### Layer 1: Security Logging
- **What**: Logs all suspicious requests
- **Where**: `packages/server/src/req-handlers/security-logging-middleware.ts`
- **Monitors**: SQL injection, XSS, path traversal, common attack tools

### Layer 2: Rate Limiting
- **What**: Limits requests per IP
- **Where**: `packages/server/src/req-handlers/rate-limit-middleware.ts`
- **Limits**:
  - Normal paths: 100 req/min
  - Suspicious paths: 20 req/min
  - Block duration: 5-10 minutes

### Layer 3: Path Validation
- **What**: Blocks malicious path patterns
- **Where**: `packages/server/src/req-handlers/path-validation-middleware.ts`
- **Blocks**:
  - SQL injection (`' OR '1'='1`, `UNION SELECT`)
  - XSS (`<script>`, event handlers)
  - Command injection (`|`, backticks, shell commands)
  - Path traversal (`../`, `..\\`)
  - Malicious files (`.php`, `.exe`, `.sh`)
  - Null bytes (`\0`, `%00`)
  - DoS (long paths, many segments)

### Layer 4: URL Validation
- **What**: Enhanced validation in page props fetching
- **Where**: `packages/nextjs/src/utils/fetch/fetch-page-props.ts`
- **Validates**: Path characters, length, format

### Layer 5: CSP Headers
- **What**: Content Security Policy
- **Where**: `packages/nextjs/next.config.js`
- **Prevents**: XSS, unauthorized script execution

## 📊 What Gets Logged

Check your application logs for:

```
# Blocked Requests
"Blocked suspicious request pattern: GET /path from IP"
"Blocked suspicious file extension: GET /file.php from IP"
"Blocked excessively long path: GET /aaaa... from IP"

# Rate Limiting
"Rate limit exceeded for IP X.X.X.X. Blocking for 300s"
"Rate limit blocked request from X.X.X.X to /path"

# Suspicious Activity
"Suspicious request detected - IP: X.X.X.X, Flags: [sqlInjection, xss]"
"Request to commonly targeted path - IP: X.X.X.X, Path: /wp-admin"
```

## 🔧 Quick Configuration Changes

### Adjust Rate Limits
Edit `packages/server/src/req-handlers/rate-limit-middleware.ts`:

```typescript
// Change these numbers:
const globalLimiter = new RateLimiter(
    60000,   // Window in ms (60 seconds)
    100,     // Max requests in window
    300000   // Block duration in ms (5 minutes)
);
```

### Add More Blocked Patterns
Edit `packages/server/src/req-handlers/path-validation-middleware.ts`:

```typescript
const MALICIOUS_PATTERNS = [
    // Add your pattern:
    /your-pattern-here/i,
];
```

### Add More Blocked File Extensions
```typescript
const BLOCKED_EXTENSIONS = [
    '.your-extension',
];
```

## ✅ Testing Checklist

```bash
# 1. Start your server
npm run dev

# 2. Test that normal requests work
curl http://localhost:3000/

# 3. Test that attacks are blocked
curl http://localhost:3000/test.php
# Expected: 400 Bad Request

curl "http://localhost:3000/test' OR 1=1"
# Expected: 400 Bad Request

curl http://localhost:3000/../etc/passwd
# Expected: 400 Bad Request

# 4. Test rate limiting
for i in {1..150}; do curl http://localhost:3000/; done
# Expected: First 100 succeed, then 429 Too Many Requests

# 5. Check logs
# Look for "Blocked suspicious request pattern" messages
```

## 🎯 Common Attack Examples (Now Blocked)

| Attack | URL | Blocked By |
|--------|-----|------------|
| SQL Injection | `/page?id=1' OR '1'='1` | Path Validation |
| XSS | `/search?q=<script>alert(1)</script>` | Path Validation |
| Path Traversal | `/../../../etc/passwd` | Path Validation |
| PHP Shell | `/upload/shell.php` | Path Validation |
| Command Injection | `/exec?cmd=ls\|grep` | Path Validation |
| DoS via long URL | `/` + 5000 characters | Path Validation |
| Brute Force | 200 requests/min | Rate Limiting |
| Reconnaissance | Multiple `/wp-admin` requests | Rate Limiting + Logging |

## 📈 Monitoring Dashboard Ideas

Track these metrics:
- Requests blocked per hour
- Top attacking IPs
- Most common attack patterns
- False positive rate
- Rate limit hits per hour

## 🚀 Deployment

1. **Staging First**: Test all changes in staging
2. **Monitor Closely**: Watch for false positives
3. **Adjust if Needed**: Tune rate limits for your traffic
4. **Set Up Alerts**: Alert on attack spikes
5. **Review Logs**: Weekly security log reviews

## 💡 Pro Tips

- **False Positives**: If legitimate requests are blocked, check patterns and adjust
- **Rate Limits**: Start conservative, increase if too many users are blocked
- **Suspicious IPs**: Consider adding permanent blocks at firewall level
- **Attack Trends**: Review patterns monthly and update accordingly
- **Keep Updated**: Regularly update pattern lists as new attacks emerge

## 📞 Need Help?

1. Check `SECURITY.md` for detailed documentation
2. Review `SECURITY_IMPLEMENTATION.md` for what was changed
3. Check test files for pattern examples
4. Look at middleware source code for logic

---

**Remember**: These are defense-in-depth measures. No single layer is perfect, but together they provide strong protection against common injection attacks.
