import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';
import RichTextEditor from '../../components/admin/RichTextEditor';
import SocialShare from '../../components/admin/SocialShare';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  published_date: string;
  status: string;
  slug: string | null;
  tags: string[] | null;
  cover_image_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setArticles(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchArticles();
    }
  };

  const handleStatusToggle = async (article: Article) => {
    const newStatus = article.status === 'published' ? 'draft' : 'published';
    const { error } = await supabase
      .from('articles')
      .update({ status: newStatus })
      .eq('id', article.id);

    if (!error) {
      fetchArticles();
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setShowEditor(true);
  };

  const handleCreate = () => {
    setEditingArticle(null);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingArticle(null);
    fetchArticles();
  };

  if (showEditor) {
    return (
      <ArticleEditor
        article={editingArticle}
        onClose={handleCloseEditor}
      />
    );
  }

  return (
    <AdminLayout currentPage="articles">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>
              Articles
            </h1>
            <p className="text-gray-600">
              Manage blog posts, news, and research articles
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-[#FF8A00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg"
          >
            <Plus size={20} />
            New Article
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No articles found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#001641]">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#001641]">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#001641]">Author</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#001641]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#001641]">Date</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-[#001641]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[#001641]">{article.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{article.excerpt}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{article.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{article.author}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      article.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : article.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(article.published_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleStatusToggle(article)}
                        className="p-2 text-gray-600 hover:text-[#FF8A00] hover:bg-orange-50 rounded-lg transition-colors"
                        title={article.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        {article.status === 'published' ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={() => handleEdit(article)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

interface ArticleEditorProps {
  article: Article | null;
  onClose: () => void;
}

function ArticleEditor({ article, onClose }: ArticleEditorProps) {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    category: article?.category || 'NEWS',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    author: article?.author || '',
    published_date: article?.published_date || new Date().toISOString().split('T')[0],
    status: article?.status || 'draft',
    slug: article?.slug || '',
    tags: article?.tags?.join(', ') || '',
    cover_image_url: article?.cover_image_url || null,
    display_order: article?.display_order || 0,
  });
  const [saving, setSaving] = useState(false);
  const articleUrl = article ? `${window.location.origin}/insights/${article.slug || article.id}` : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const articleData = {
      ...formData,
      tags: tagsArray.length > 0 ? tagsArray : null,
      slug: formData.slug || null,
    };

    let error;
    if (article) {
      ({ error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', article.id));
    } else {
      ({ error } = await supabase
        .from('articles')
        .insert([articleData]));
    }

    setSaving(false);

    if (!error) {
      onClose();
    } else {
      alert('Error saving article: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>
              {article ? 'Edit Article' : 'Create New Article'}
            </h1>
            <p className="text-gray-600">
              Fill in the details below to {article ? 'update' : 'create'} your article
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#001641] mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001641] mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                >
                  <option value="NEWS">News</option>
                  <option value="RESEARCH">Research</option>
                  <option value="THOUGHT LEADERSHIP">Thought Leadership</option>
                </select>
              </div>
            </div>

            <ImageUpload
              currentImageUrl={formData.cover_image_url}
              onImageUploaded={(url) => setFormData({ ...formData, cover_image_url: url })}
              onImageRemoved={() => setFormData({ ...formData, cover_image_url: null })}
            />

            <div>
              <label className="block text-sm font-semibold text-[#001641] mb-2">
                Excerpt *
              </label>
              <textarea
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#001641] mb-2">
                Content *
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                placeholder="Write your article content here... Markdown is supported."
                rows={15}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#001641] mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001641] mb-2">
                  Published Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.published_date}
                  onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#001641] mb-2">
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001641] mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#001641] mb-2">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="article-url-slug"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#001641] mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="blockchain, compliance, analytics"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            {article && article.status === 'published' && (
              <div className="pt-6 border-t border-gray-200">
                <label className="block text-sm font-semibold text-[#001641] mb-3">
                  Share Article
                </label>
                <SocialShare
                  title={article.title}
                  url={articleUrl}
                />
              </div>
            )}

            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#FF8A00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : article ? 'Update Article' : 'Create Article'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
