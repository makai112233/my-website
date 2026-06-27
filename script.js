const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const leadForm = document.querySelector("[data-lead-form]");
const formNote = document.querySelector("[data-form-note]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuButton?.addEventListener("click", () => {
  mobileNav?.classList.toggle("is-open");
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
  });
});

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(leadForm);
  const industry = String(data.get("industry") || "").trim();
  const problem = String(data.get("problem") || "").trim();
  const contact = String(data.get("contact") || "").trim();

  if (!industry || !contact) {
    formNote.textContent = "请先填写行业和联系方式。";
    return;
  }

  const summary = [
    "已生成本地跟进信息：",
    `行业：${industry}`,
    problem ? `当前问题：${problem}` : "当前问题：待补充",
    `联系方式：${contact}`,
    "建议下一步：先做AI账号体检，再预约人工复盘。"
  ].join("\n");

  navigator.clipboard?.writeText(summary).catch(() => {});
  formNote.textContent = "已在本地生成跟进信息，并尝试复制到剪贴板。正式上线后可接入企业微信或线索后台。";
});
