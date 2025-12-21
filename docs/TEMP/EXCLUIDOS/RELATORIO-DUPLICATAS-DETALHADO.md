# 📊 RELATÓRIO COMPLETO DE DUPLICATAS - Panels.css

## ⚠️ ATENÇÃO: Revisão Manual Necessária

Este relatório lista TODAS as classes com múltiplas definições.
**VOCÊ decide** quais manter, quais remover, ou se fazer merge manual.

**Total de seletores com duplicatas:** 155

---

## `.access-denied-icon`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2649-2653)

```css
.access-denied-icon {
  color: #dc2626;
  margin-bottom: 1.5rem;
  animation: pulse 2s infinite;
}
```

### Ocorrência 2 (linhas 2706-2709)

```css
.access-denied-icon {
  width: 48px;
  height: 48px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.access-denied-message`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2673-2679)

```css
.access-denied-message {
  font-size: 1.25rem;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 0.75rem;
  line-height: 1.6;
}
```

### Ocorrência 2 (linhas 2715-2717)

```css
.access-denied-message {
  font-size: 1.125rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.access-denied-submessage`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2682-2687)

```css
.access-denied-submessage {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  max-width: 500px;
}
```

### Ocorrência 2 (linhas 2719-2721)

```css
.access-denied-submessage {
  font-size: 0.9375rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.access-denied-title`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2665-2670)

```css
.access-denied-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}
```

### Ocorrência 2 (linhas 2711-2713)

```css
.access-denied-title {
  font-size: 1.5rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alert-arrow`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1811-1817)

```css
.alert-arrow {
  font-size: 1.25rem;
  color: #9ca3af;
  align-self: center;
  margin-top: 1rem;
  flex-shrink: 0;
}
```

### Ocorrência 2 (linhas 1832-1835)

```css
.alert-arrow {
  transform: rotate(90deg);
  margin: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alert-change`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1768-1774)

```css
.alert-change {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 150px;
}
```

### Ocorrência 2 (linhas 1837-1839)

```css
.alert-change {
  min-width: 100%;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alert-changes`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1761-1766)

```css
.alert-changes {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
```

### Ocorrência 2 (linhas 1827-1830)

```css
.alert-changes {
  flex-direction: column;
  gap: 0.5rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-actions`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4240-4245)

```css
.alerts-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
```

### Ocorrência 2 (linhas 4324-4327)

```css
.alerts-actions {
  flex-direction: column;
  align-items: stretch;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-convenio-badge`

**Ocorrências:** 3

### Ocorrência 1 (linhas 2552-2560)

```css
.alerts-convenio-badge {
  background-color: #3b82f6;
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}
```

### Ocorrência 2 (linhas 4124-4132)

```css
.alerts-convenio-badge {
  background-color: #3b82f6;
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}
```

### Ocorrência 3 (linhas 4195-4199)

```css
.alerts-convenio-badge {
  order: 3;
  width: 100%;
  text-align: center;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-convenio-text`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4248-4253)

```css
.alerts-convenio-text {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 400;
  margin-right: auto;
}
```

### Ocorrência 2 (linhas 4329-4331)

```css
.alerts-convenio-text {
  margin-right: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-empty`

**Ocorrências:** 3

### Ocorrência 1 (linhas 1695-1703)

```css
.alerts-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 2rem;
}
```

### Ocorrência 2 (linhas 4151-4159)

```css
.alerts-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  min-height: 200px;
}
```

### Ocorrência 3 (linhas 4272-4280)

```css
.alerts-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  min-height: 200px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-empty-icon`

**Ocorrências:** 3

### Ocorrência 1 (linhas 1705-1708)

```css
.alerts-empty-icon {
  color: #d1d5db;
  margin-bottom: 1rem;
}
```

### Ocorrência 2 (linhas 4161-4164)

```css
.alerts-empty-icon {
  color: #d1d5db;
  margin-bottom: 1rem;
}
```

### Ocorrência 3 (linhas 4282-4285)

```css
.alerts-empty-icon {
  color: #d1d5db;
  margin-bottom: 1rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-empty-subtext`

**Ocorrências:** 3

### Ocorrência 1 (linhas 1717-1721)

```css
.alerts-empty-subtext {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0;
}
```

### Ocorrência 2 (linhas 4173-4177)

```css
.alerts-empty-subtext {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0;
}
```

### Ocorrência 3 (linhas 4294-4298)

```css
.alerts-empty-subtext {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-empty-text`

**Ocorrências:** 3

### Ocorrência 1 (linhas 1710-1715)

```css
.alerts-empty-text {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}
```

### Ocorrência 2 (linhas 4166-4171)

```css
.alerts-empty-text {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}
```

### Ocorrência 3 (linhas 4287-4292)

```css
.alerts-empty-text {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-header`

**Ocorrências:** 8

### Ocorrência 1 (linhas 1652-1659)

```css
.alerts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}
```

### Ocorrência 2 (linhas 1821-1825)

```css
.alerts-header {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
```

### Ocorrência 3 (linhas 2535-2543)

```css
.alerts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
  gap: 1rem;
}
```

### Ocorrência 4 (linhas 2569-2572)

```css
.alerts-header {
  flex-direction: column;
  align-items: stretch;
}
```

### Ocorrência 5 (linhas 4075-4083)

```css
.alerts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
  gap: 1rem;
}
```

### Ocorrência 6 (linhas 4184-4188)

```css
.alerts-header {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}
```

### Ocorrência 7 (linhas 4211-4217)

```css
.alerts-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  padding-bottom: 1rem;
}
```

### Ocorrência 8 (linhas 4316-4318)

```css
.alerts-header {
  padding: 1rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-header .comments-btn`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2563-2565)

```css
.alerts-header .comments-btn {
  margin-left: auto;
}
```

### Ocorrência 2 (linhas 2578-2581)

```css
.alerts-header .comments-btn {
  margin-left: 0;
  width: 100%;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-header-left`

**Ocorrências:** 4

### Ocorrência 1 (linhas 2545-2549)

```css
.alerts-header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
```

### Ocorrência 2 (linhas 2574-2576)

```css
.alerts-header-left {
  justify-content: center;
}
```

### Ocorrência 3 (linhas 4085-4090)

```css
.alerts-header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}
```

### Ocorrência 4 (linhas 4190-4193)

```css
.alerts-header-left {
  width: 100%;
  flex-wrap: wrap;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-icon`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1667-1670)

```css
.alerts-icon {
  color: #f59e0b;
  flex-shrink: 0;
}
```

### Ocorrência 2 (linhas 4096-4101)

```css
.alerts-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #f59e0b;
  flex-shrink: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-list`

**Ocorrências:** 3

### Ocorrência 1 (linhas 1688-1692)

```css
.alerts-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}
```

### Ocorrência 2 (linhas 4259-4266)

```css
.alerts-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
```

### Ocorrência 3 (linhas 4320-4322)

```css
.alerts-list {
  padding: 0 1rem 1rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel`

**Ocorrências:** 4

### Ocorrência 1 (linhas 1645-1650)

```css
.alerts-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
}
```

### Ocorrência 2 (linhas 4304-4309)

```css
.alerts-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
}
```

### Ocorrência 3 (linhas 4413-4418)

```css
.alerts-panel {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  background: white !important;
}
```

### Ocorrência 4 (linhas 4655-4660)

```css
.alerts-panel {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  background: white !important;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-arrow`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4540-4544)

```css
.alerts-panel .alert-arrow {
  color: #9ca3af;
  font-size: 1.25rem;
  flex-shrink: 0;
}
```

### Ocorrência 2 (linhas 4768-4772)

```css
.alerts-panel .alert-arrow {
  color: #9ca3af;
  font-size: 1.25rem;
  flex-shrink: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-change`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4510-4513)

```css
.alerts-panel .alert-change {
  flex: 1;
  min-width: 200px;
}
```

### Ocorrência 2 (linhas 4738-4741)

```css
.alerts-panel .alert-change {
  flex: 1;
  min-width: 200px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-change-label`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4515-4522)

```css
.alerts-panel .alert-change-label {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}
```

### Ocorrência 2 (linhas 4743-4750)

```css
.alerts-panel .alert-change-label {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-change-value`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4524-4529)

```css
.alerts-panel .alert-change-value {
  display: block;
  font-size: 0.875rem;
  color: #111827;
  word-break: break-word;
}
```

### Ocorrência 2 (linhas 4752-4757)

```css
.alerts-panel .alert-change-value {
  display: block;
  font-size: 0.875rem;
  color: #111827;
  word-break: break-word;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-changes`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4503-4508)

```css
.alerts-panel .alert-changes {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
```

### Ocorrência 2 (linhas 4731-4736)

```css
.alerts-panel .alert-changes {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-date`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4498-4501)

```css
.alerts-panel .alert-date {
  font-size: 0.75rem;
  color: #6b7280;
}
```

### Ocorrência 2 (linhas 4726-4729)

```css
.alerts-panel .alert-date {
  font-size: 0.75rem;
  color: #6b7280;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-empty`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4546-4549)

```css
.alerts-panel .alert-empty {
  font-style: italic;
  color: #9ca3af;
}
```

### Ocorrência 2 (linhas 4774-4777)

```css
.alerts-panel .alert-empty {
  font-style: italic;
  color: #9ca3af;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-field`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4492-4496)

```css
.alerts-panel .alert-field {
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
}
```

### Ocorrência 2 (linhas 4720-4724)

```css
.alerts-panel .alert-field {
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-header`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4483-4490)

```css
.alerts-panel .alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}
```

### Ocorrência 2 (linhas 4711-4718)

```css
.alerts-panel .alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-item`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4470-4476)

```css
.alerts-panel .alert-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.2s ease;
}
```

### Ocorrência 2 (linhas 4698-4704)

```css
.alerts-panel .alert-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.2s ease;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-item:hover`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4478-4481)

```css
.alerts-panel .alert-item:hover {
  border-color: #d1d5db;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### Ocorrência 2 (linhas 4706-4709)

```css
.alerts-panel .alert-item:hover {
  border-color: #d1d5db;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-new .alert-change-value`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4535-4538)

```css
.alerts-panel .alert-new .alert-change-value {
  color: #16a34a;
  font-weight: 500;
}
```

### Ocorrência 2 (linhas 4763-4766)

```css
.alerts-panel .alert-new .alert-change-value {
  color: #16a34a;
  font-weight: 500;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alert-old .alert-change-value`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4531-4533)

```css
.alerts-panel .alert-old .alert-change-value {
  color: #dc2626;
}
```

### Ocorrência 2 (linhas 4759-4761)

```css
.alerts-panel .alert-old .alert-change-value {
  color: #dc2626;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alerts-actions`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4385-4395)

```css
.alerts-panel .alerts-actions {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 0.75rem !important;
  flex-wrap: wrap !important;
  background: none !important;
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
```

### Ocorrência 2 (linhas 4595-4606)

```css
.alerts-panel .alerts-actions {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 1rem !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border: none !important;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alerts-convenio-text`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4398-4407)

```css
.alerts-panel .alerts-convenio-text {
  font-size: 0.875rem !important;
  color: #6b7280 !important;
  font-weight: 400 !important;
  text-align: left !important;
  margin: 0 !important;
  padding: 0 !important;
  background: none !important;
  border: none !important;
}
```

### Ocorrência 2 (linhas 4612-4621)

```css
.alerts-panel .alerts-convenio-text {
  font-size: 0.875rem !important;
  color: #6b7280 !important;
  font-weight: 400 !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: left !important;
  flex: 0 0 auto !important;
  transition: color 0.2s ease !important;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alerts-empty`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4438-4446)

```css
.alerts-panel .alerts-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  min-height: 200px;
}
```

### Ocorrência 2 (linhas 4666-4674)

```css
.alerts-panel .alerts-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  min-height: 200px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alerts-empty-icon`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4448-4451)

```css
.alerts-panel .alerts-empty-icon {
  color: #d1d5db;
  margin-bottom: 1rem;
}
```

### Ocorrência 2 (linhas 4676-4679)

```css
.alerts-panel .alerts-empty-icon {
  color: #d1d5db;
  margin-bottom: 1rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alerts-empty-subtext`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4460-4464)

```css
.alerts-panel .alerts-empty-subtext {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0;
}
```

### Ocorrência 2 (linhas 4688-4692)

```css
.alerts-panel .alerts-empty-subtext {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alerts-empty-text`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4453-4458)

```css
.alerts-panel .alerts-empty-text {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}
```

### Ocorrência 2 (linhas 4681-4686)

```css
.alerts-panel .alerts-empty-text {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alerts-header`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4348-4358)

```css
.alerts-panel .alerts-header {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.75rem !important;
  padding: 1.5rem !important;
  padding-bottom: 1rem !important;
  background-color: transparent !important;
  background: none !important;
  border: none !important;
  border-bottom: none !important;
}
```

### Ocorrência 2 (linhas 4560-4568)

```css
.alerts-panel .alerts-header {
  display: flex !important;
  flex-direction: column !important;
  gap: 1rem !important;
  padding: 1.5rem !important;
  padding-bottom: 1rem !important;
  background: transparent !important;
  border: none !important;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alerts-list`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4424-4432)

```css
.alerts-panel .alerts-list {
  flex: 1 !important;
  overflow-y: auto !important;
  padding: 0 1.5rem 1.5rem !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.75rem !important;
  background: white !important;
}
```

### Ocorrência 2 (linhas 4641-4649)

```css
.alerts-panel .alerts-list {
  flex: 1 !important;
  overflow-y: auto !important;
  padding: 0 1.5rem 1.5rem !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.75rem !important;
  background: white !important;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alerts-title`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4364-4374)

```css
.alerts-panel .alerts-title {
  font-size: 1.125rem !important;
  font-weight: 600 !important;
  color: #111827 !important;
  margin: 0 !important;
  padding: 0 !important;
  transition: color 0.2s ease !important;
  text-align: left !important;
  background: none !important;
  border: none !important;
}
```

### Ocorrência 2 (linhas 4574-4585)

```css
.alerts-panel .alerts-title {
  font-size: 1.125rem !important;
  font-weight: 600 !important;
  color: #111827 !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: left !important;
  align-self: flex-start !important;
  width: 100% !important;
  display: block !important;
  transition: color 0.2s ease !important;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-panel .alerts-title-inactive`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4377-4379)

```css
.alerts-panel .alerts-title-inactive {
  color: #d1d5db !important;
}
```

### Ocorrência 2 (linhas 4587-4589)

```css
.alerts-panel .alerts-title-inactive {
  color: #d1d5db !important;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-title`

**Ocorrências:** 3

### Ocorrência 1 (linhas 1672-1677)

```css
.alerts-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
```

### Ocorrência 2 (linhas 4107-4113)

```css
.alerts-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;  /* Preto quando ativo */
  margin: 0;
  transition: color 0.2s ease;  /* Transição suave */
}
```

### Ocorrência 3 (linhas 4223-4229)

```css
.alerts-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  transition: color 0.2s ease;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.alerts-title-inactive`

**Ocorrências:** 2

### Ocorrência 1 (linhas 4116-4118)

```css
.alerts-title-inactive {
  color: #d1d5db;  /* Cinza claro */
}
```

### Ocorrência 2 (linhas 4232-4234)

```css
.alerts-title-inactive {
  color: #d1d5db;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivo-actions`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2252-2255)

```css
.arquivo-actions {
  display: flex;
  gap: 0.5rem;
}
```

### Ocorrência 2 (linhas 3076-3080)

```css
.arquivo-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivo-btn`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2257-2267)

```css
.arquivo-btn {
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
```

### Ocorrência 2 (linhas 3082-3092)

```css
.arquivo-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivo-btn-delete`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2282-2284)

```css
.arquivo-btn-delete {
  color: #ef4444;
}
```

### Ocorrência 2 (linhas 3103-3105)

```css
.arquivo-btn-delete {
  color: #ef4444;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivo-btn-delete:hover`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2286-2289)

```css
.arquivo-btn-delete:hover {
  background: #fef2f2;
  border-color: #ef4444;
}
```

### Ocorrência 2 (linhas 3107-3110)

```css
.arquivo-btn-delete:hover {
  background: #fee2e2;
  color: #dc2626;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivo-btn-download`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2273-2275)

```css
.arquivo-btn-download {
  color: #3b82f6;
}
```

### Ocorrência 2 (linhas 3094-3096)

```css
.arquivo-btn-download {
  color: #3b82f6;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivo-btn-download:hover`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2277-2280)

```css
.arquivo-btn-download:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}
```

### Ocorrência 2 (linhas 3098-3101)

```css
.arquivo-btn-download:hover {
  background: #eff6ff;
  color: #2563eb;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivo-info`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2230-2236)

```css
.arquivo-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}
```

### Ocorrência 2 (linhas 3054-3060)

```css
.arquivo-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivo-item`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2208-2218)

```css
.arquivo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}
```

### Ocorrência 2 (linhas 3032-3042)

```css
.arquivo-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivo-item svg`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2225-2228)

```css
.arquivo-item svg {
  color: #6b7280;
  flex-shrink: 0;
}
```

### Ocorrência 2 (linhas 3049-3052)

```css
.arquivo-item svg {
  color: #6b7280;
  flex-shrink: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivo-item:hover`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2220-2223)

```css
.arquivo-item:hover {
  background: #f9fafb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
```

### Ocorrência 2 (linhas 3044-3047)

```css
.arquivo-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivo-nome`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2238-2245)

```css
.arquivo-nome {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### Ocorrência 2 (linhas 3062-3069)

```css
.arquivo-nome {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivo-tamanho`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2247-2250)

```css
.arquivo-tamanho {
  font-size: 0.75rem;
  color: #6b7280;
}
```

### Ocorrência 2 (linhas 3071-3074)

```css
.arquivo-tamanho {
  font-size: 0.75rem;
  color: #6b7280;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivos-existentes`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2192-2198)

```css
.arquivos-existentes {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}
```

### Ocorrência 2 (linhas 3017-3023)

```css
.arquivos-existentes {
  margin-bottom: 16px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.arquivos-subtitle`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2200-2205)

```css
.arquivos-subtitle {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}
```

### Ocorrência 2 (linhas 3025-3030)

```css
.arquivos-subtitle {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.button-icon`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1035-1038)

```css
.button-icon {
  width: 1rem;
  height: 1rem;
}
```

### Ocorrência 2 (linhas 1212-1215)

```css
.button-icon {
  width: 1.25rem;
  height: 1.25rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.button-icon.spinning`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1040-1042)

```css
.button-icon.spinning {
  animation: spin 1s linear infinite;
}
```

### Ocorrência 2 (linhas 1217-1219)

```css
.button-icon.spinning {
  animation: spin 1s linear infinite;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.carousel-button`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2029-2041)

```css
.carousel-button {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
}
```

### Ocorrência 2 (linhas 2164-2167)

```css
.carousel-button {
  width: 40px;
  height: 40px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.carousel-card`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1927-1938)

```css
.carousel-card {
  background: white;
  border-radius: 1rem;
  padding: 3rem 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
}
```

### Ocorrência 2 (linhas 2142-2145)

```css
.carousel-card {
  padding: 2rem 1.5rem;
  min-height: 500px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.carousel-description`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1976-1982)

```css
.carousel-description {
  font-size: 1.125rem;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 600px;
}
```

### Ocorrência 2 (linhas 2151-2153)

```css
.carousel-description {
  font-size: 1rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.carousel-features`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1985-1994)

```css
.carousel-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 500px;
}
```

### Ocorrência 2 (linhas 2155-2157)

```css
.carousel-features {
  grid-template-columns: 1fr;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.carousel-icon-wrapper`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1946-1955)

```css
.carousel-icon-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}
```

### Ocorrência 2 (linhas 2159-2162)

```css
.carousel-icon-wrapper {
  width: 100px;
  height: 100px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.carousel-title`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1969-1974)

```css
.carousel-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}
```

### Ocorrência 2 (linhas 2147-2149)

```css
.carousel-title {
  font-size: 1.5rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.carteira-table`

**Ocorrências:** 2

### Ocorrência 1 (linhas 84-88)

```css
.carteira-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}
```

### Ocorrência 2 (linhas 1866-1869)

```css
.carteira-table {
  table-layout: fixed;
  width: 100%;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.carteira-table-td`

**Ocorrências:** 2

### Ocorrência 1 (linhas 166-170)

```css
.carteira-table-td {
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}
```

### Ocorrência 2 (linhas 1871-1875)

```css
.carteira-table-td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.comment-item`

**Ocorrências:** 2

### Ocorrência 1 (linhas 423-431)

```css
.comment-item {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
```

### Ocorrência 2 (linhas 2472-2475)

```css
.comment-item {
  cursor: pointer;
  user-select: none;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.comment-item.selected`

**Ocorrências:** 2

### Ocorrência 1 (linhas 438-441)

```css
.comment-item.selected {
  border-color: #2563eb;
  background-color: #eff6ff;
}
```

### Ocorrência 2 (linhas 2465-2469)

```css
.comment-item.selected {
  background: linear-gradient(to right, #dbeafe, #eff6ff);
  border-left: 4px solid #3b82f6;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.comment-item:hover`

**Ocorrências:** 2

### Ocorrência 1 (linhas 433-436)

```css
.comment-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}
```

### Ocorrência 2 (linhas 2477-2479)

```css
.comment-item:hover {
  background: #f9fafb;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.comment-meta`

**Ocorrências:** 2

### Ocorrência 1 (linhas 443-448)

```css
.comment-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
```

### Ocorrência 2 (linhas 2866-2871)

```css
.comment-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.comments-actions`

**Ocorrências:** 2

### Ocorrência 1 (linhas 357-361)

```css
.comments-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
```

### Ocorrência 2 (linhas 2520-2522)

```css
.comments-actions {
  flex-wrap: wrap;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.comments-btn`

**Ocorrências:** 3

### Ocorrência 1 (linhas 363-374)

```css
.comments-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
```

### Ocorrência 2 (linhas 2524-2527)

```css
.comments-btn {
  flex: 1 1 45%;
  min-width: 100px;
}
```

### Ocorrência 3 (linhas 4333-4336)

```css
.comments-btn {
  width: 100%;
  justify-content: center;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.comments-btn:disabled`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2440-2444)

```css
.comments-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #9ca3af;
}
```

### Ocorrência 2 (linhas 4054-4058)

```css
.comments-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #9ca3af;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.comments-btn:disabled:hover`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2446-2449)

```css
.comments-btn:disabled:hover {
  background: #9ca3af;
  transform: none;
}
```

### Ocorrência 2 (linhas 4060-4064)

```css
.comments-btn:disabled:hover {
  background: #9ca3af;
  transform: none;
  box-shadow: none;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.comments-title`

**Ocorrências:** 2

### Ocorrência 1 (linhas 350-355)

```css
.comments-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
```

### Ocorrência 2 (linhas 4037-4043)

```css
.comments-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;  /* Preto quando ativo */
  margin: 0;
  transition: color 0.2s ease;  /* Transição suave */
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.database-access-denied`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2638-2646)

```css
.database-access-denied {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  min-height: 400px;
}
```

### Ocorrência 2 (linhas 2702-2704)

```css
.database-access-denied {
  padding: 3rem 1.5rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-column`

**Ocorrências:** 2

### Ocorrência 1 (linhas 3666-3670)

```css
.details-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```

### Ocorrência 2 (linhas 3880-3884)

```css
.details-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-content-formatted`

**Ocorrências:** 6

### Ocorrência 1 (linhas 3653-3660)

```css
.details-content-formatted {
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem 0;
}
```

### Ocorrência 2 (linhas 3736-3739)

```css
.details-content-formatted {
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
```

### Ocorrência 3 (linhas 3751-3754)

```css
.details-content-formatted {
  grid-template-columns: 1fr;
  gap: 1rem;
}
```

### Ocorrência 4 (linhas 3867-3874)

```css
.details-content-formatted {
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem 0;
}
```

### Ocorrência 5 (linhas 3950-3953)

```css
.details-content-formatted {
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
```

### Ocorrência 6 (linhas 3965-3968)

```css
.details-content-formatted {
  grid-template-columns: 1fr;
  gap: 1rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-content-formatted::-webkit-scrollbar`

**Ocorrências:** 2

### Ocorrência 1 (linhas 3795-3797)

```css
.details-content-formatted::-webkit-scrollbar {
  width: 8px;
}
```

### Ocorrência 2 (linhas 4009-4011)

```css
.details-content-formatted::-webkit-scrollbar {
  width: 8px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-content-formatted::-webkit-scrollbar-thumb`

**Ocorrências:** 2

### Ocorrência 1 (linhas 3804-3807)

```css
.details-content-formatted::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
```

### Ocorrência 2 (linhas 4018-4021)

```css
.details-content-formatted::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-content-formatted::-webkit-scrollbar-thumb:hover`

**Ocorrências:** 2

### Ocorrência 1 (linhas 3809-3811)

```css
.details-content-formatted::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
```

### Ocorrência 2 (linhas 4023-4025)

```css
.details-content-formatted::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-content-formatted::-webkit-scrollbar-track`

**Ocorrências:** 2

### Ocorrência 1 (linhas 3799-3802)

```css
.details-content-formatted::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 4px;
}
```

### Ocorrência 2 (linhas 4013-4016)

```css
.details-content-formatted::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 4px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-empty-icon`

**Ocorrências:** 3

### Ocorrência 1 (linhas 258-262)

```css
.details-empty-icon {
  width: 3rem;
  height: 3rem;
  color: #d1d5db;
}
```

### Ocorrência 2 (linhas 3718-3722)

```css
.details-empty-icon {
  width: 3rem;
  height: 3rem;
  color: #d1d5db;
}
```

### Ocorrência 3 (linhas 3932-3936)

```css
.details-empty-icon {
  width: 3rem;
  height: 3rem;
  color: #d1d5db;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-empty-state`

**Ocorrências:** 3

### Ocorrência 1 (linhas 248-256)

```css
.details-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  text-align: center;
}
```

### Ocorrência 2 (linhas 3707-3716)

```css
.details-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
}
```

### Ocorrência 3 (linhas 3921-3930)

```css
.details-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-empty-text`

**Ocorrências:** 3

### Ocorrência 1 (linhas 264-269)

```css
.details-empty-text {
  color: #6b7280;
  font-size: 0.875rem;
  max-width: 20rem;
  margin: 0;
}
```

### Ocorrência 2 (linhas 3724-3729)

```css
.details-empty-text {
  color: #6b7280;
  font-size: 0.875rem;
  max-width: 20rem;
  margin: 0;
}
```

### Ocorrência 3 (linhas 3938-3943)

```css
.details-empty-text {
  color: #6b7280;
  font-size: 0.875rem;
  max-width: 20rem;
  margin: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-export-buttons`

**Ocorrências:** 8

### Ocorrência 1 (linhas 2590-2595)

```css
.details-export-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}
```

### Ocorrência 2 (linhas 2622-2625)

```css
.details-export-buttons {
  width: 100%;
  margin-left: 0;
}
```

### Ocorrência 3 (linhas 3643-3647)

```css
.details-export-buttons {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}
```

### Ocorrência 4 (linhas 3761-3764)

```css
.details-export-buttons {
  width: 100%;
  justify-content: flex-end;
}
```

### Ocorrência 5 (linhas 3780-3783)

```css
.details-export-buttons {
  flex-direction: column;
  width: 100%;
}
```

### Ocorrência 6 (linhas 3857-3861)

```css
.details-export-buttons {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}
```

### Ocorrência 7 (linhas 3975-3978)

```css
.details-export-buttons {
  width: 100%;
  justify-content: flex-end;
}
```

### Ocorrência 8 (linhas 3994-3997)

```css
.details-export-buttons {
  flex-direction: column;
  width: 100%;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-export-buttons .comments-btn`

**Ocorrências:** 3

### Ocorrência 1 (linhas 2627-2629)

```css
.details-export-buttons .comments-btn {
  flex: 1;
}
```

### Ocorrência 2 (linhas 3785-3788)

```css
.details-export-buttons .comments-btn {
  width: 100%;
  justify-content: center;
}
```

### Ocorrência 3 (linhas 3999-4002)

```css
.details-export-buttons .comments-btn {
  width: 100%;
  justify-content: center;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-field`

**Ocorrências:** 2

### Ocorrência 1 (linhas 3676-3680)

```css
.details-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
```

### Ocorrência 2 (linhas 3890-3894)

```css
.details-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-header`

**Ocorrências:** 3

### Ocorrência 1 (linhas 277-281)

```css
.details-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
```

### Ocorrência 2 (linhas 2598-2605)

```css
.details-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}
```

### Ocorrência 3 (linhas 2613-2615)

```css
.details-header {
  flex-wrap: wrap;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-header-clean`

**Ocorrências:** 4

### Ocorrência 1 (linhas 3627-3634)

```css
.details-header-clean {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}
```

### Ocorrência 2 (linhas 3756-3759)

```css
.details-header-clean {
  flex-direction: column;
  align-items: flex-start;
}
```

### Ocorrência 3 (linhas 3835-3842)

```css
.details-header-clean {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}
```

### Ocorrência 4 (linhas 3970-3973)

```css
.details-header-clean {
  flex-direction: column;
  align-items: flex-start;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-label`

**Ocorrências:** 4

### Ocorrência 1 (linhas 3682-3688)

```css
.details-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #1e40af;
  text-transform: none;
  line-height: 1.4;
}
```

### Ocorrência 2 (linhas 3766-3768)

```css
.details-label {
  font-size: 0.75rem;
}
```

### Ocorrência 3 (linhas 3896-3902)

```css
.details-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #1e40af;
  text-transform: none;
  line-height: 1.4;
}
```

### Ocorrência 4 (linhas 3980-3982)

```css
.details-label {
  font-size: 0.75rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-panel`

**Ocorrências:** 5

### Ocorrência 1 (linhas 239-246)

```css
.details-panel {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}
```

### Ocorrência 2 (linhas 3614-3621)

```css
.details-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 1.5rem;
  gap: 1rem;
}
```

### Ocorrência 3 (linhas 3747-3749)

```css
.details-panel {
  padding: 1rem;
}
```

### Ocorrência 4 (linhas 3822-3829)

```css
.details-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 1.5rem;
  gap: 1rem;
}
```

### Ocorrência 5 (linhas 3961-3963)

```css
.details-panel {
  padding: 1rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-title`

**Ocorrências:** 3

### Ocorrência 1 (linhas 308-313)

```css
.details-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
```

### Ocorrência 2 (linhas 2607-2609)

```css
.details-title {
  flex: 1;
}
```

### Ocorrência 3 (linhas 2617-2620)

```css
.details-title {
  width: 100%;
  margin-bottom: 0.5rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-title-clean`

**Ocorrências:** 2

### Ocorrência 1 (linhas 3636-3641)

```css
.details-title-clean {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
```

### Ocorrência 2 (linhas 3844-3850)

```css
.details-title-clean {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  transition: color 0.2s ease;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-value`

**Ocorrências:** 4

### Ocorrência 1 (linhas 3690-3696)

```css
.details-value {
  font-size: 0.9375rem;
  color: #111827;
  font-weight: 400;
  line-height: 1.5;
  word-break: break-word;
}
```

### Ocorrência 2 (linhas 3770-3772)

```css
.details-value {
  font-size: 0.875rem;
}
```

### Ocorrência 3 (linhas 3904-3910)

```css
.details-value {
  font-size: 0.9375rem;
  color: #111827;
  font-weight: 400;
  line-height: 1.5;
  word-break: break-word;
}
```

### Ocorrência 4 (linhas 3984-3986)

```css
.details-value {
  font-size: 0.875rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.details-value:empty::after`

**Ocorrências:** 2

### Ocorrência 1 (linhas 3698-3701)

```css
.details-value:empty::after {
  content: '-';
  color: #9ca3af;
}
```

### Ocorrência 2 (linhas 3912-3915)

```css
.details-value:empty::after {
  content: '-';
  color: #9ca3af;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.dropzone-text`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2912-2917)

```css
.dropzone-text {
  font-size: 0.95rem;
  color: #374151;
  margin: 8px 0 4px;
  font-weight: 500;
}
```

### Ocorrência 2 (linhas 3125-3127)

```css
.dropzone-text {
  font-size: 0.875rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.file-upload-area`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2292-2299)

```css
.file-upload-area {
  background: #fafbfc;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.2s ease;
}
```

### Ocorrência 2 (linhas 2877-2883)

```css
.file-upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 16px;
  background: #f9fafb;
  transition: all 0.2s ease;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.file-upload-dropzone`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2891-2900)

```css
.file-upload-dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
```

### Ocorrência 2 (linhas 3121-3123)

```css
.file-upload-dropzone {
  padding: 24px 12px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.form-checkbox`

**Ocorrências:** 2

### Ocorrência 1 (linhas 576-582)

```css
.form-checkbox {
  width: 1rem;
  height: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  cursor: pointer;
}
```

### Ocorrência 2 (linhas 2826-2830)

```css
.form-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.form-group`

**Ocorrências:** 2

### Ocorrência 1 (linhas 543-545)

```css
.form-group {
  margin-bottom: 1rem;
}
```

### Ocorrência 2 (linhas 2746-2748)

```css
.form-group {
  margin-bottom: 20px; /* Espaçamento consistente entre campos */
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.form-group-checkbox`

**Ocorrências:** 2

### Ocorrência 1 (linhas 547-551)

```css
.form-group-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
```

### Ocorrência 2 (linhas 2816-2820)

```css
.form-group-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.form-input-disabled`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2184-2189)

```css
.form-input-disabled {
  background-color: #f3f4f6;
  color: #6b7280;
  cursor: not-allowed;
  border-color: #d1d5db;
}
```

### Ocorrência 2 (linhas 2803-2807)

```css
.form-input-disabled {
  background: #f3f4f6;
  color: #6b7280;
  cursor: not-allowed;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.form-label`

**Ocorrências:** 2

### Ocorrência 1 (linhas 553-559)

```css
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.375rem;
}
```

### Ocorrência 2 (linhas 2754-2760)

```css
.form-label {
  display: block;
  margin-bottom: 8px; /* Espaço entre label e input */
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.form-select`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2764-2773)

```css
.form-select {
  width: 100%; /* Garante que ocupem toda a largura disponível */
  box-sizing: border-box; /* Inclui padding/border na largura */
  max-width: 100%; /* Não ultrapassa o container */
  padding: 10px 12px; /* Padding interno consistente */
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
}
```

### Ocorrência 2 (linhas 2775-2783)

```css
.form-select {
  background: white;
  cursor: pointer;
  appearance: none; /* Remove estilo padrão do browser */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px; /* Espaço para a seta */
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.form-textarea`

**Ocorrências:** 2

### Ocorrência 1 (linhas 584-594)

```css
.form-textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  transition: all 0.2s;
  resize: vertical;
}
```

### Ocorrência 2 (linhas 2809-2814)

```css
.form-textarea {
  resize: vertical; /* Permite redimensionar verticalmente */
  min-height: 100px;
  font-family: inherit;
  line-height: 1.5;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.info-section`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1117-1122)

```css
.info-section {
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}
```

### Ocorrência 2 (linhas 1280-1284)

```css
.info-section {
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.75rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.info-title`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1124-1129)

```css
.info-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
}
```

### Ocorrência 2 (linhas 1286-1291)

```css
.info-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.modal-body`

**Ocorrências:** 2

### Ocorrência 1 (linhas 537-541)

```css
.modal-body {
  flex: 1;
  padding: 1.25rem;
  overflow-y: auto;
}
```

### Ocorrência 2 (linhas 2739-2744)

```css
.modal-body {
  max-height: 70vh;
  overflow-y: auto;
  padding: 24px 32px; /* Padding interno maior e simétrico */
  padding-right: 28px; /* Espaço para scrollbar */
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.modal-content`

**Ocorrências:** 2

### Ocorrência 1 (linhas 492-501)

```css
.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}
```

### Ocorrência 2 (linhas 2733-2737)

```css
.modal-content {
  width: 90%;
  max-width: 700px; /* Largura máxima do modal */
  margin: 0 auto;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.modal-content-large`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2177-2181)

```css
.modal-content-large {
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
}
```

### Ocorrência 2 (linhas 2408-2410)

```css
.modal-content-large {
  max-width: 95%;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.modal-footer`

**Ocorrências:** 2

### Ocorrência 1 (linhas 601-607)

```css
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid #e5e7eb;
}
```

### Ocorrência 2 (linhas 2841-2847)

```css
.modal-footer {
  padding: 20px 32px; /* Alinhado com modal-body */
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.modal-header`

**Ocorrências:** 2

### Ocorrência 1 (linhas 503-509)

```css
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}
```

### Ocorrência 2 (linhas 2836-2839)

```css
.modal-header {
  padding: 20px 32px; /* Alinhado com modal-body */
  border-bottom: 1px solid #e5e7eb;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.operation-info-grid`

**Ocorrências:** 2

### Ocorrência 1 (linhas 201-205)

```css
.operation-info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}
```

### Ocorrência 2 (linhas 233-235)

```css
.operation-info-grid {
  grid-template-columns: 1fr 1fr;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.remove-file-button`

**Ocorrências:** 3

### Ocorrência 1 (linhas 981-993)

```css
.remove-file-button {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fee2e2;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0;
}
```

### Ocorrência 2 (linhas 2380-2391)

```css
.remove-file-button {
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  padding: 0.25rem;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
```

### Ocorrência 3 (linhas 2990-3002)

```css
.remove-file-button {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.remove-file-button:hover`

**Ocorrências:** 3

### Ocorrência 1 (linhas 995-997)

```css
.remove-file-button:hover {
  background-color: #fecaca;
}
```

### Ocorrência 2 (linhas 2393-2397)

```css
.remove-file-button:hover {
  background: #fef2f2;
  border-color: #ef4444;
  color: #ef4444;
}
```

### Ocorrência 3 (linhas 3004-3007)

```css
.remove-file-button:hover {
  background: #fee2e2;
  color: #dc2626;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-button`

**Ocorrências:** 5

### Ocorrência 1 (linhas 710-724)

```css
.search-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}
```

### Ocorrência 2 (linhas 3215-3229)

```css
.search-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
```

### Ocorrência 3 (linhas 3339-3341)

```css
.search-button {
  justify-content: center;
}
```

### Ocorrência 4 (linhas 3451-3465)

```css
.search-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
```

### Ocorrência 5 (linhas 3575-3577)

```css
.search-button {
  justify-content: center;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-button-icon`

**Ocorrências:** 3

### Ocorrência 1 (linhas 735-738)

```css
.search-button-icon {
  width: 1rem;
  height: 1rem;
}
```

### Ocorrência 2 (linhas 3246-3249)

```css
.search-button-icon {
  width: 18px;
  height: 18px;
}
```

### Ocorrência 3 (linhas 3482-3485)

```css
.search-button-icon {
  width: 18px;
  height: 18px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-button:active:not(:disabled)`

**Ocorrências:** 2

### Ocorrência 1 (linhas 3237-3239)

```css
.search-button:active:not(:disabled) {
  transform: translateY(0);
}
```

### Ocorrência 2 (linhas 3473-3475)

```css
.search-button:active:not(:disabled) {
  transform: translateY(0);
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-button:disabled`

**Ocorrências:** 3

### Ocorrência 1 (linhas 730-733)

```css
.search-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### Ocorrência 2 (linhas 3241-3244)

```css
.search-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
```

### Ocorrência 3 (linhas 3477-3480)

```css
.search-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-button:hover:not(:disabled)`

**Ocorrências:** 3

### Ocorrência 1 (linhas 726-728)

```css
.search-button:hover:not(:disabled) {
  background-color: #1d4ed8;
}
```

### Ocorrência 2 (linhas 3231-3235)

```css
.search-button:hover:not(:disabled) {
  background: #2563eb;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}
```

### Ocorrência 3 (linhas 3467-3471)

```css
.search-button:hover:not(:disabled) {
  background: #2563eb;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-empty-icon`

**Ocorrências:** 5

### Ocorrência 1 (linhas 800-804)

```css
.search-empty-icon {
  width: 4rem;
  height: 4rem;
  opacity: 0.5;
}
```

### Ocorrência 2 (linhas 3311-3317)

```css
.search-empty-icon {
  width: 64px;
  height: 64px;
  color: #93c5fd;
  margin-bottom: 16px;
  opacity: 0.6;
}
```

### Ocorrência 3 (linhas 3358-3361)

```css
.search-empty-icon {
  width: 48px;
  height: 48px;
}
```

### Ocorrência 4 (linhas 3547-3553)

```css
.search-empty-icon {
  width: 64px;
  height: 64px;
  color: #93c5fd;
  margin-bottom: 16px;
  opacity: 0.6;
}
```

### Ocorrência 5 (linhas 3594-3597)

```css
.search-empty-icon {
  width: 48px;
  height: 48px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-empty-state`

**Ocorrências:** 5

### Ocorrência 1 (linhas 790-798)

```css
.search-empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #9ca3af;
}
```

### Ocorrência 2 (linhas 3301-3309)

```css
.search-empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
}
```

### Ocorrência 3 (linhas 3363-3365)

```css
.search-empty-state {
  padding: 32px 16px;
}
```

### Ocorrência 4 (linhas 3537-3545)

```css
.search-empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
}
```

### Ocorrência 5 (linhas 3599-3601)

```css
.search-empty-state {
  padding: 32px 16px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-empty-text`

**Ocorrências:** 3

### Ocorrência 1 (linhas 806-810)

```css
.search-empty-text {
  font-size: 0.875rem;
  text-align: center;
  max-width: 300px;
}
```

### Ocorrência 2 (linhas 3319-3324)

```css
.search-empty-text {
  font-size: 0.9375rem;
  color: #1e40af;
  max-width: 300px;
  line-height: 1.5;
}
```

### Ocorrência 3 (linhas 3555-3560)

```css
.search-empty-text {
  font-size: 0.9375rem;
  color: #1e40af;
  max-width: 300px;
  line-height: 1.5;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-header`

**Ocorrências:** 5

### Ocorrência 1 (linhas 666-670)

```css
.search-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
```

### Ocorrência 2 (linhas 3158-3163)

```css
.search-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
```

### Ocorrência 3 (linhas 3354-3356)

```css
.search-header {
  margin-bottom: 16px;
}
```

### Ocorrência 4 (linhas 3396-3401)

```css
.search-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;  /* Igual ao CarteiraPanel */
}
```

### Ocorrência 5 (linhas 3590-3592)

```css
.search-header {
  margin-bottom: 16px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-icon-header`

**Ocorrências:** 5

### Ocorrência 1 (linhas 672-676)

```css
.search-icon-header {
  width: 2rem;
  height: 2rem;
  color: #2563eb;
}
```

### Ocorrência 2 (linhas 3165-3170)

```css
.search-icon-header {
  color: #2563eb;
  width: 20px;  /* Mesmo tamanho do CommentsPanel */
  height: 20px;
  flex-shrink: 0;
}
```

### Ocorrência 3 (linhas 3347-3350)

```css
.search-icon-header {
  width: 18px;
  height: 18px;
}
```

### Ocorrência 4 (linhas 3403-3407)

```css
.search-icon-header {
  width: 1.5rem;  /* Igual ao CarteiraPanel (24px) */
  height: 1.5rem;
  color: #2563eb;  /* Mesma cor azul */
}
```

### Ocorrência 5 (linhas 3583-3586)

```css
.search-icon-header {
  width: 18px;
  height: 18px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-input-field`

**Ocorrências:** 3

### Ocorrência 1 (linhas 690-698)

```css
.search-input-field {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;
}
```

### Ocorrência 2 (linhas 3190-3198)

```css
.search-input-field {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #bfdbfe;
  border-radius: 8px;
  font-size: 0.9375rem;
  background: white;
  transition: all 0.2s ease;
}
```

### Ocorrência 3 (linhas 3426-3434)

```css
.search-input-field {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #bfdbfe;
  border-radius: 8px;
  font-size: 0.9375rem;
  background: white;
  transition: all 0.2s ease;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-input-field::placeholder`

**Ocorrências:** 2

### Ocorrência 1 (linhas 3211-3213)

```css
.search-input-field::placeholder {
  color: #9ca3af;
}
```

### Ocorrência 2 (linhas 3447-3449)

```css
.search-input-field::placeholder {
  color: #9ca3af;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-input-field:disabled`

**Ocorrências:** 3

### Ocorrência 1 (linhas 705-708)

```css
.search-input-field:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}
```

### Ocorrência 2 (linhas 3206-3209)

```css
.search-input-field:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}
```

### Ocorrência 3 (linhas 3442-3445)

```css
.search-input-field:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-input-field:focus`

**Ocorrências:** 3

### Ocorrência 1 (linhas 700-703)

```css
.search-input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### Ocorrência 2 (linhas 3200-3204)

```css
.search-input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### Ocorrência 3 (linhas 3436-3440)

```css
.search-input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-input-section`

**Ocorrências:** 5

### Ocorrência 1 (linhas 685-688)

```css
.search-input-section {
  display: flex;
  gap: 0.75rem;
}
```

### Ocorrência 2 (linhas 3184-3188)

```css
.search-input-section {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
```

### Ocorrência 3 (linhas 3335-3337)

```css
.search-input-section {
  flex-direction: column;
}
```

### Ocorrência 4 (linhas 3420-3424)

```css
.search-input-section {
  display: flex;
  gap: 0.5rem;  /* Consistente com o resto */
  margin-bottom: 0;  /* Removido margin extra */
}
```

### Ocorrência 5 (linhas 3571-3573)

```css
.search-input-section {
  flex-direction: column;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-message`

**Ocorrências:** 3

### Ocorrência 1 (linhas 740-745)

```css
.search-message {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-style: italic;
}
```

### Ocorrência 2 (linhas 3268-3277)

```css
.search-message {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
```

### Ocorrência 3 (linhas 3504-3513)

```css
.search-message {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-message.error`

**Ocorrências:** 2

### Ocorrência 1 (linhas 3285-3289)

```css
.search-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}
```

### Ocorrência 2 (linhas 3521-3525)

```css
.search-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-message.info`

**Ocorrências:** 3

### Ocorrência 1 (linhas 747-750)

```css
.search-message.info {
  background-color: #eff6ff;
  color: #1e40af;
}
```

### Ocorrência 2 (linhas 3291-3295)

```css
.search-message.info {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
}
```

### Ocorrência 3 (linhas 3527-3531)

```css
.search-message.info {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-message.success`

**Ocorrências:** 3

### Ocorrência 1 (linhas 752-755)

```css
.search-message.success {
  background-color: #d1fae5;
  color: #065f46;
}
```

### Ocorrência 2 (linhas 3279-3283)

```css
.search-message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #6ee7b7;
}
```

### Ocorrência 3 (linhas 3515-3519)

```css
.search-message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #6ee7b7;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-panel`

**Ocorrências:** 5

### Ocorrência 1 (linhas 657-664)

```css
.search-panel {
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
```

### Ocorrência 2 (linhas 3144-3151)

```css
.search-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #eff6ff;
  padding: 16px;
  overflow-y: auto;
}
```

### Ocorrência 3 (linhas 3331-3333)

```css
.search-panel {
  padding: 12px;
}
```

### Ocorrência 4 (linhas 3382-3390)

```css
.search-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #eff6ff;  /* Azul claro sólido - ALTERE ESTA LINHA para mudar a cor */
  padding: 1.5rem;  /* Mesmo padding do CarteiraPanel */
  gap: 1rem;
  overflow: hidden;  /* Igual ao CarteiraPanel */
}
```

### Ocorrência 5 (linhas 3567-3569)

```css
.search-panel {
  padding: 12px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.search-title`

**Ocorrências:** 5

### Ocorrência 1 (linhas 678-683)

```css
.search-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
```

### Ocorrência 2 (linhas 3172-3178)

```css
.search-title {
  font-size: 1.125rem;  /* Mesmo tamanho do CommentsPanel */
  font-weight: 700;
  color: #1e40af;
  margin: 0;
  line-height: 1.2;
}
```

### Ocorrência 3 (linhas 3343-3345)

```css
.search-title {
  font-size: 1rem;
}
```

### Ocorrência 4 (linhas 3409-3414)

```css
.search-title {
  font-size: 1.125rem;  /* Igual ao CarteiraPanel (18px) */
  font-weight: 600;  /* Igual ao CarteiraPanel */
  color: #111827;  /* Mesma cor do CarteiraPanel */
  margin: 0;
}
```

### Ocorrência 5 (linhas 3579-3581)

```css
.search-title {
  font-size: 1rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.selected-file-item`

**Ocorrências:** 3

### Ocorrência 1 (linhas 2349-2358)

```css
.selected-file-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
}
```

### Ocorrência 2 (linhas 2413-2415)

```css
.selected-file-item {
  flex-wrap: wrap;
}
```

### Ocorrência 3 (linhas 2953-2963)

```css
.selected-file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.selected-file-item svg`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2360-2363)

```css
.selected-file-item svg {
  color: #6b7280;
  flex-shrink: 0;
}
```

### Ocorrência 2 (linhas 2970-2973)

```css
.selected-file-item svg {
  color: #6b7280;
  flex-shrink: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.selected-file-name`

**Ocorrências:** 4

### Ocorrência 1 (linhas 2365-2372)

```css
.selected-file-name {
  flex: 1;
  font-size: 0.875rem;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### Ocorrência 2 (linhas 2418-2420)

```css
.selected-file-name {
  max-width: 150px;
}
```

### Ocorrência 3 (linhas 2975-2982)

```css
.selected-file-name {
  flex: 1;
  font-size: 0.875rem;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### Ocorrência 4 (linhas 3130-3132)

```css
.selected-file-name {
  max-width: 150px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.selected-file-size`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2374-2378)

```css
.selected-file-size {
  font-size: 0.75rem;
  color: #6b7280;
  margin-right: 0.5rem;
}
```

### Ocorrência 2 (linhas 2984-2988)

```css
.selected-file-size {
  font-size: 0.75rem;
  color: #6b7280;
  flex-shrink: 0;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.selected-files`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2337-2340)

```css
.selected-files {
  margin-top: 1rem;
  text-align: left;
}
```

### Ocorrência 2 (linhas 2940-2944)

```css
.selected-files {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.selected-files-title`

**Ocorrências:** 2

### Ocorrência 1 (linhas 2342-2347)

```css
.selected-files-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}
```

### Ocorrência 2 (linhas 2946-2951)

```css
.selected-files-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.spinning`

**Ocorrências:** 2

### Ocorrência 1 (linhas 3251-3253)

```css
.spinning {
  animation: spin 1s linear infinite;
}
```

### Ocorrência 2 (linhas 3487-3489)

```css
.spinning {
  animation: spin 1s linear infinite;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.status-icon`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1067-1071)

```css
.status-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}
```

### Ocorrência 2 (linhas 1275-1278)

```css
.status-icon {
  width: 1.25rem;
  height: 1.25rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.status-message`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1049-1055)

```css
.status-message {
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}
```

### Ocorrência 2 (linhas 1255-1263)

```css
.status-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.status-message.error`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1062-1065)

```css
.status-message.error {
  background-color: #fee2e2;
  border: 1px solid #ef4444;
}
```

### Ocorrência 2 (linhas 1270-1273)

```css
.status-message.error {
  background-color: #fee2e2;
  color: #991b1b;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.status-message.success`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1057-1060)

```css
.status-message.success {
  background-color: #d1fae5;
  border: 1px solid #10b981;
}
```

### Ocorrência 2 (linhas 1265-1268)

```css
.status-message.success {
  background-color: #d1fae5;
  color: #065f46;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.welcome-subtitle`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1910-1916)

```css
.welcome-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
}
```

### Ocorrência 2 (linhas 2138-2140)

```css
.welcome-subtitle {
  font-size: 1rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `.welcome-title`

**Ocorrências:** 2

### Ocorrência 1 (linhas 1902-1908)

```css
.welcome-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}
```

### Ocorrência 2 (linhas 2134-2136)

```css
.welcome-title {
  font-size: 1.875rem;
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `from`

**Ocorrências:** 6

### Ocorrência 1 (linhas 1045-1045)

```css
from {
  transform: rotate(0deg);
}
```

### Ocorrência 2 (linhas 1222-1222)

```css
from {
  transform: rotate(0deg);
}
```

### Ocorrência 3 (linhas 2111-2114)

```css
from {
  opacity: 0;
  transform: translateY(-20px);
}
```

### Ocorrência 4 (linhas 2122-2125)

```css
from {
  opacity: 0;
  transform: translateY(20px);
}
```

### Ocorrência 5 (linhas 3256-3258)

```css
from {
  transform: rotate(0deg);
}
```

### Ocorrência 6 (linhas 3492-3494)

```css
from {
  transform: rotate(0deg);
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

## `to`

**Ocorrências:** 6

### Ocorrência 1 (linhas 1046-1046)

```css
to {
  transform: rotate(360deg);
}
```

### Ocorrência 2 (linhas 1223-1223)

```css
to {
  transform: rotate(360deg);
}
```

### Ocorrência 3 (linhas 2115-2118)

```css
to {
  opacity: 1;
  transform: translateY(0);
}
```

### Ocorrência 4 (linhas 2126-2129)

```css
to {
  opacity: 1;
  transform: translateY(0);
}
```

### Ocorrência 5 (linhas 3259-3261)

```css
to {
  transform: rotate(360deg);
}
```

### Ocorrência 6 (linhas 3495-3497)

```css
to {
  transform: rotate(360deg);
}
```

**DECISÃO:**
- [ ] Manter todas (são contextuais)
- [ ] Remover ocorrências: ___________
- [ ] Fazer merge manual das propriedades
- [ ] Outra ação: ___________

---

