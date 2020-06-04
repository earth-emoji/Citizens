using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Citizens.Data;
using Citizens.Data.Entities;

namespace Citizens.Controllers
{
    public class ConversationsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ConversationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Conversations
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Conversations.Include(c => c.Discussion).Include(c => c.Starter);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Conversations/Details/5
        public async Task<IActionResult> Details(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var conversation = await _context.Conversations
                .Include(c => c.Discussion)
                .Include(c => c.Starter)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (conversation == null)
            {
                return NotFound();
            }

            return View(conversation);
        }

        // GET: Conversations/Create
        public IActionResult Create()
        {
            ViewData["DiscussionId"] = new SelectList(_context.Discussions, "Id", "Id");
            ViewData["StarterId"] = new SelectList(_context.Members, "Id", "Id");
            return View();
        }

        // POST: Conversations/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Slug,Title,Content,IsPrivate,StarterId,DiscussionId")] Conversation conversation)
        {
            if (ModelState.IsValid)
            {
                _context.Add(conversation);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["DiscussionId"] = new SelectList(_context.Discussions, "Id", "Id", conversation.DiscussionId);
            ViewData["StarterId"] = new SelectList(_context.Members, "Id", "Id", conversation.StarterId);
            return View(conversation);
        }

        // GET: Conversations/Edit/5
        public async Task<IActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var conversation = await _context.Conversations.FindAsync(id);
            if (conversation == null)
            {
                return NotFound();
            }
            ViewData["DiscussionId"] = new SelectList(_context.Discussions, "Id", "Id", conversation.DiscussionId);
            ViewData["StarterId"] = new SelectList(_context.Members, "Id", "Id", conversation.StarterId);
            return View(conversation);
        }

        // POST: Conversations/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(long id, [Bind("Slug,Title,Content,IsPrivate,StarterId,DiscussionId")] Conversation conversation)
        {
            if (id != conversation.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(conversation);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ConversationExists(conversation.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["DiscussionId"] = new SelectList(_context.Discussions, "Id", "Id", conversation.DiscussionId);
            ViewData["StarterId"] = new SelectList(_context.Members, "Id", "Id", conversation.StarterId);
            return View(conversation);
        }

        // GET: Conversations/Delete/5
        public async Task<IActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var conversation = await _context.Conversations
                .Include(c => c.Discussion)
                .Include(c => c.Starter)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (conversation == null)
            {
                return NotFound();
            }

            return View(conversation);
        }

        // POST: Conversations/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            var conversation = await _context.Conversations.FindAsync(id);
            _context.Conversations.Remove(conversation);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ConversationExists(long id)
        {
            return _context.Conversations.Any(e => e.Id == id);
        }
    }
}
